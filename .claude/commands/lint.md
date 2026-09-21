---
description: Run a health check on the wiki.
---

Run a health check across `wiki/` and report findings. Do not fix anything — this is diagnostic only.

Scan for:
- **Broken `[[wiki-links]]`** — links that point to pages which don't exist.
- **Orphan pages** — pages with no incoming links from any other page, and no link to them from `wiki/index.md`.
- **Missing/invalid frontmatter** — pages missing any of the required fields (`title`, `type`, `sources`, `related`, `created`, `last-updated`), or with a `type` value outside the allowed set (concept, entity, source-summary, comparison, project, person).
- **Stale pages** — pages whose `last-updated` is 30+ days old.
- **Contradictions** — claims on different pages that conflict with each other.

Report the results as a structured list, grouped by issue type, with the affected file path(s) for each finding. Do not modify any files. At the end, ask the user which findings (if any) they want fixed, and wait for their response before making any changes.
