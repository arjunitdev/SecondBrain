# Second Brain Vault

## 1. Project Structure

This vault is split into two domains with a strict separation of responsibility:

- **`raw/`** — the user's source documents. Never modified, rewritten, or deleted by Claude. This is ground truth, organized by where it came from:
  - `raw/claude-exports/` — exported Claude conversations
  - `raw/notion/` — exported Notion pages/databases
  - `raw/google-doc/` — exported Google Docs
  - `raw/slack-exports/` — exported Slack conversations/threads
  - `raw/notes/` — freeform notes not tied to a specific export source
- **`wiki/`** — Claude's domain. Synthesized, living pages built from `raw/` material. These get rewritten and cross-linked over time as understanding improves.
  - `wiki/index.md` — master catalog of every page in the wiki, grouped by type (concepts, projects, people, etc.). Kept up to date whenever a page is added, moved, or removed.
  - `wiki/log.md` — append-only activity log. Records what was added/changed and when. Never edited retroactively, only appended to.
  - `wiki/concepts/` — pages about ideas, topics, and subject-matter knowledge
  - `wiki/projects/` — pages tracking specific projects and their state
  - `wiki/people/` — dossiers on individuals
- **`journal/`** — daily notes (setup pending, Part 2).
- **`content/`** — content pipeline for drafts/write-ups produced from the wiki (setup pending, Part 2).

## 2. Page Conventions

Every page in `wiki/` must start with YAML frontmatter containing exactly these fields:

```yaml
---
title: 
type:          # one of: concept, entity, source-summary, comparison, project, person
sources:       # raw/ files or other references this page draws from
related:       # [[wiki-links]] to related pages
created: 
last-updated: 
---
```

Additional conventions:
- **Atomic pages**: one idea per page. If a page starts covering two distinct concepts, split it.
- **Wiki-links**: reference related pages using `[[page-name]]` syntax so the graph stays navigable.
- **Consistent headings**: use a predictable heading structure within a page type (e.g. all `concept` pages follow the same skeleton: Summary → Details → Related → Open Questions) so pages of the same type are easy to scan.
- Update `wiki/index.md` and append to `wiki/log.md` whenever a page is created, moved, or removed.

## 3. Style Guide

- Write in clear, concise prose — no filler, no padding.
- Prefer bullet points over long paragraphs where the content is list-like.
- Attribute every claim to its source (which `raw/` file or conversation it came from).
- Note contradictions explicitly rather than silently resolving them — if two sources disagree, say so and cite both.

## 4. Domain Context

_Fill this section in with your own context: what domains this vault spans (e.g. work, school, personal projects), your role(s), and which areas should be treated as central/ongoing versus one-off. This is what tells Claude how to weigh and categorize incoming material — the more specific, the better the synthesis._
