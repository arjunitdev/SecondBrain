# Second Brain Vault

A structure and set of Claude Code skills for turning raw exported notes (Claude conversations, Google Docs, Notion pages, Slack threads, freeform notes) into a cross-linked, synthesized personal wiki.

This is the **skeleton** — folder structure, conventions, and the Claude Code commands that operate on it. It ships with no personal notes; you fill it with your own.

## How it works

- Drop source material into `raw/` (see each subfolder's README for where to export from).
- Run `/ingest` to have Claude read new sources and write/update pages in `wiki/`.
- Run `/query <question>` to get an answer synthesized strictly from the wiki, with citations.
- Run `/lint` to health-check the wiki for broken links, orphan pages, missing frontmatter, and stale pages.
- Run `/log <note>` to append a quick timestamped note to `wiki/log.md`.

Full conventions (frontmatter, page types, style guide) are in [`CLAUDE.md`](./CLAUDE.md) — read and adapt Section 4 ("Domain Context") to your own life/work before you start.

## Structure

```
raw/        your source documents — never edited by Claude
wiki/       Claude's synthesized, living pages — index.md, log.md, concepts/, projects/, people/
journal/    daily notes (not yet set up)
content/    drafts/write-ups produced from the wiki (not yet set up)
.claude/commands/   the ingest/query/lint/log skills
scripts/google-docs-export/   optional helper to pull Google Docs into raw/google-doc/
```

## Setup

1. Clone this repo, open it in an editor with Claude Code.
2. Fill in `CLAUDE.md` §4 with your own context.
3. Drop files into the matching `raw/` subfolder.
4. Run `/ingest`.

(Optional) To pull Google Docs automatically instead of exporting by hand, see `scripts/google-docs-export/README.md` for one-time OAuth setup.
