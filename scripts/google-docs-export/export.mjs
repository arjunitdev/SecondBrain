// Exports all Google Docs in the user's Drive as Markdown files into
// raw/google-doc/ in the Second-Brain vault, using the Drive API's
// native text/markdown export.
//
// One-time setup: see README.md in this folder.
// Usage:
//   node export.mjs                 export every Google Doc in "My Drive"
//   node export.mjs --folder <id>   only export docs inside a specific Drive folder
//   node export.mjs --limit 5       only export the first N docs (useful for a test run)

import { google } from "googleapis";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { exec } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, "credentials.json");
const TOKEN_PATH = path.join(__dirname, "token.json");
const DEST_DIR = path.join(__dirname, "..", "..", "raw", "google-doc");
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];
const REDIRECT_PORT = 53682;

function parseArgs(argv) {
  const args = { folder: null, limit: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--folder") args.folder = argv[++i];
    else if (argv[i] === "--limit") args.limit = parseInt(argv[++i], 10);
  }
  return args;
}

function loadCredentials() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(
      `Missing credentials.json in ${__dirname}\n` +
        "Follow the one-time setup in README.md to download your OAuth client file from Google Cloud Console."
    );
    process.exit(1);
  }
  const raw = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
  return raw.installed || raw.web;
}

function getOAuthClient() {
  const { client_id, client_secret } = loadCredentials();
  const redirectUri = `http://localhost:${REDIRECT_PORT}/oauth2callback`;
  return new google.auth.OAuth2(client_id, client_secret, redirectUri);
}

async function authorize(oAuth2Client) {
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  console.log("\nOpen this URL in your browser and approve access:\n");
  console.log(authUrl + "\n");

  // Best-effort auto-open; harmless if it fails, the printed URL still works.
  exec(`start "" "${authUrl}"`, () => {});

  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://localhost:${REDIRECT_PORT}`);
      if (url.pathname !== "/oauth2callback") return;
      const code = url.searchParams.get("code");
      const error = url.searchParams.get("error");
      res.end(error ? "Authorization failed. You can close this tab." : "Authorization complete. You can close this tab.");
      server.close();
      if (error) reject(new Error(error));
      else resolve(code);
    });
    server.listen(REDIRECT_PORT);
  });

  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log(`Saved auth token to ${TOKEN_PATH} for future runs.\n`);
  return oAuth2Client;
}

async function listGoogleDocs(drive, folderId) {
  const files = [];
  let pageToken;
  let query = "mimeType='application/vnd.google-apps.document' and trashed=false";
  if (folderId) query += ` and '${folderId}' in parents`;

  do {
    const res = await drive.files.list({
      q: query,
      fields: "nextPageToken, files(id, name, modifiedTime)",
      pageSize: 100,
      pageToken,
    });
    files.push(...res.data.files);
    pageToken = res.data.nextPageToken;
  } while (pageToken);

  return files;
}

function sanitizeFilename(name) {
  return name.replace(/[\\/:*?"<>|]/g, "-").trim();
}

function uniqueDestPath(destDir, baseName, fileId) {
  let candidate = path.join(destDir, `${baseName}.md`);
  if (!fs.existsSync(candidate)) return candidate;
  // Name collision: disambiguate with a short suffix from the file id.
  return path.join(destDir, `${baseName}-${fileId.slice(0, 6)}.md`);
}

async function exportDoc(drive, file, destDir) {
  const destPath = uniqueDestPath(destDir, sanitizeFilename(file.name), file.id);
  const res = await drive.files.export(
    { fileId: file.id, mimeType: "text/markdown" },
    { responseType: "stream" }
  );

  await new Promise((resolve, reject) => {
    const dest = fs.createWriteStream(destPath);
    res.data.on("end", resolve).on("error", reject).pipe(dest);
  });

  return destPath;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  fs.mkdirSync(DEST_DIR, { recursive: true });

  const oAuth2Client = await authorize(getOAuthClient());
  const drive = google.drive({ version: "v3", auth: oAuth2Client });

  console.log("Looking up Google Docs...");
  let files = await listGoogleDocs(drive, args.folder);
  if (args.limit) files = files.slice(0, args.limit);

  if (files.length === 0) {
    console.log("No Google Docs found.");
    return;
  }

  console.log(`Found ${files.length} doc(s). Exporting to ${DEST_DIR}\n`);

  let ok = 0;
  for (const file of files) {
    try {
      const destPath = await exportDoc(drive, file, DEST_DIR);
      console.log(`  OK  ${file.name} -> ${path.relative(process.cwd(), destPath)}`);
      ok++;
    } catch (err) {
      console.error(`  FAIL ${file.name}: ${err.message}`);
    }
  }

  console.log(`\nDone. ${ok}/${files.length} docs exported.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
