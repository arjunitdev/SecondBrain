---
description: Synthesise an answer from the wiki.
argument-hint: the question to answer
---

Answer the following question using only the wiki as your source of truth: $ARGUMENTS

1. Read `wiki/index.md` to see what pages exist, then read the pages most relevant to the question.
2. Synthesise an answer grounded strictly in what those pages say.
3. Cite every claim by wiki page name (e.g. "per [[some-page]]").
4. If relevant pages disagree with each other, flag the disagreement explicitly rather than silently picking one side.
5. If, while synthesising, you notice a new connection or gap that the wiki doesn't currently capture, propose it to the user as a suggested wiki update — but do not write or edit any wiki page. Wait for confirmation before making any changes.
