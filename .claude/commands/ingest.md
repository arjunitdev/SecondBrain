---
description: Ingest new files from raw/ into wiki/.
argument-hint: "[max-sources]"
---

Ingest source material from `raw/` into the wiki, following the conventions in `CLAUDE.md`.

1. Scan `raw/` (all subfolders) for files that do not yet have a corresponding `source-summary` page in `wiki/`. Skip anything already summarised — check `wiki/index.md` and existing `source-summary` pages to determine what's already been processed.
2. Process 5-10 unread sources thoroughly in this run. If `$ARGUMENTS` is provided, treat it as a number and limit processing to that many sources instead.
3. For each source, in order:
   - Read the file fully.
   - Write a `source-summary` page in `wiki/` capturing its key content, with correct YAML frontmatter (`title`, `type: source-summary`, `sources`, `related`, `created`, `last-updated`).
   - Create or update any `concept`, `project`, or `person` pages implied by the content, following the atomic-page and frontmatter conventions in `CLAUDE.md`.
   - Cross-link the new/updated pages to each other and to the source-summary using `[[wiki-links]]`.
4. After processing all sources in this run:
   - Update `wiki/index.md` so every new or changed page is correctly catalogued.
   - Append one timestamped entry per source processed to `wiki/log.md`, noting what was ingested and what pages were created/updated.
5. Do not modify anything in `raw/`. If a source is ambiguous or seems to duplicate an existing page, note the ambiguity in the log entry rather than guessing silently.
