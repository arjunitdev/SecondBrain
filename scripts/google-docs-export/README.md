# google-docs-export

Exports every Google Doc in your Drive as Markdown directly into
`raw/google-doc/`, using the Drive API's native `text/markdown` export
(no HTML-to-Markdown conversion needed).

## One-time setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project (or pick an existing one).
3. **APIs & Services → Library** → search for "Google Drive API" → **Enable**.
4. **APIs & Services → OAuth consent screen**:
   - User type: External is fine for personal use.
   - Fill in the required app name/email fields.
   - Add your own Google account under **Test users** (this keeps the app in
     "Testing" mode, which is all you need for personal scripts).
5. **APIs & Services → Credentials → Create Credentials → OAuth client ID**:
   - Application type: **Desktop app**.
   - Download the resulting JSON and save it as `credentials.json` in this
     folder (`scripts/google-docs-export/credentials.json`).
6. Install dependencies:
   ```
   cd scripts/google-docs-export
   npm install
   ```

`credentials.json` and `token.json` are already git-ignored — they're your
personal auth material, never commit them.

## Running it

```
node export.mjs
```

First run:
- Prints (and tries to auto-open) a Google sign-in/consent URL.
- Approve read-only Drive access.
- The script catches the redirect on `localhost`, exchanges it for a token,
  and saves it to `token.json` so future runs skip the browser step.

Then it lists every Google Doc in your Drive, exports each one as Markdown,
and writes it to `../../raw/google-doc/<Doc Title>.md`.

### Options

- `node export.mjs --limit 5` — only export the first 5 docs (good for a test run).
- `node export.mjs --folder <FOLDER_ID>` — only export docs inside a specific
  Drive folder (the ID is the long string in the folder's URL).

### Notes

- Filenames are sanitized for Windows; if two docs share a title, the second
  gets a short suffix from its Drive file ID so nothing is overwritten.
- Re-running is safe — already-exported files with unchanged names will be
  overwritten with the latest version of the doc.
- Files land in Markdown already, so no extra conversion step is needed
  before running the vault's `ingest` skill on them.
