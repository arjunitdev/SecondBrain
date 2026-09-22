# Second Brain 

This is my personal knowledge base. It uses **Obsidian** to read and view notes, and **Claude Code** as an AI helper to organize everything automatically.

## How It Works

This project is split into two main folders. It is very important to keep them separate:

*   📂 **`raw/` (My Messy Notes):** This is where I dump my raw data. Exports from ChatGPT, meeting notes, articles, and random thoughts go here. The AI is **never** allowed to edit files in this folder.
    * **AI chat:** `claude-exports`, `chatgpt-exports`, `perplexity`, `raycast-ai`, `cursor-chats`, `copilot-chats`
    * **AI notes & meetings:** `granola-exports`, `mem`, `reflect`, `fathom`, `otter`, `fireflies`, `loom`
    * **Docs & wikis:** `notion-exports`, `google-docs`, `apple-notes`, `evernote`, `bear`, `roam`
    * **Reading:** `readwise`, `kindle-highlights`, `apple-books`, `pocket`, `instapaper`, `matter`
    * **Media:** `podcast-transcripts`, `youtube-transcripts`, `voice-memos`, `substack`
    * **Work:** `slack-exports`, `linear`, `jira`, `email-archives`
    * **Research:** `pdfs`, `arxiv-papers`, `zotero`
    * **Plus:** `articles` (web clippings) and `notes` (personal notes) ect ect 

*   📂 **`wiki/` (The AI's Brain):** This is where Claude organizes my messy notes. It reads the `raw/` folder, figures out what is important, and creates clean, linked pages in this folder. I read these pages in Obsidian.

## The 4 Main Commands
I use Claude Code in my terminal to run this brain. Here are the four commands I use:

1.  `/ingest` - Tells Claude to read new files in `raw/` and organize them into the `wiki/`.
2.  `/query` - Asks Claude a question based on everything inside the `wiki/`.
3.  `/lint` - Asks Claude to check the `wiki/` for broken links or messy pages.
4.  `/log` - Quickly saves a single thought or idea into my log book.

 For example, this is a short portion of my second brain ( not gonna show the full portion *_* )
<img width="1188" height="777" alt="image" src="https://github.com/user-attachments/assets/9faf499a-9577-48ac-a022-5fcf7b53d8b1" />


 ## all in one solution 
```text
 ┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
 │  1. YOUR MESSY NOTES   │      │   2. CLAUDE ORGANISES  │      │   3. YOUR SECOND BRAIN │
 │  ────────────────────  │      │   ───────────────────  │      │   ───────────────────  │
 │                        │      │                        │      │                        │
 │   raw/                 │      │   Reads raw/, follows  │      │   wiki/                │
 │   • claude-chat.md     │ ───► │   rules in CLAUDE.md,  │ ───► │   • index.md           │
 │   • google docs.md     │      │   writes wiki/         │      │   • concepts/          │
 │   • meeting-notes.md   │      │                        │      │   • people/            │
 │   • notion-export.md   │      │   Commands you run:    │      │   • projects/          │
 │   • slack.md           │      │     /ingest  /query    │      │                        │
 │   YOU drop notes here. │      │     /lint    /log      │      │   YOU read here, in    │
 │                        │      │                        │      │   Obsidian.            │
 └────────────────────────┘      └────────────────────────┘      └────────────────────────┘

       scattered across               turns mess into               ask questions, spot
       5 different apps               linked knowledge              patterns, never lose
                                                                    an idea again
```
## Future Additions

* **Automatic Note Pulling:** Right now, getting notes into the `raw/` folder and running `/ingest` is manual. I plan to add connectors for Google Drive, Notion, Slack, and Gmail so new documents and important emails automatically drop into my brain.

* **Work Schedule Tracker:** A feature that can read a PDF schedule (like a catering shift schedule), automatically put the shifts into my Google Calendar with 60/90-minute reminders, and log them in my wiki so I can track my work history.

* **Smarter AI Search:** Upgrading the `/query` command to use "semantic search" (AI embeddings). This means Claude will understand the meaning of my question and find the right notes, even if I don't type the exact matching words.

* **Automatic Cleanup Tools:** Adding commands to automatically find and delete duplicate files in the `raw/` folder, and a scanner that proactively warns me if two notes contradict each other (like conflicting resume histories).

* **Daily Journal & Content Creation:** Setting up a daily journaling system in the `journal/` folder, plus a workflow that helps turn my organized wiki pages into rough drafts for articles or posts.

* **Phone Access:** Setting up a secure way (like Tailscale or a private web server) so I can ask Claude questions about my second brain from my phone while I am away from my computer.

* **GitHub Setup:** Adding a standard open-source license (like an MIT license) to the public repository, and setting up automatic format checkers (CI) to make sure all notes have the correct layout.


                                                                    
