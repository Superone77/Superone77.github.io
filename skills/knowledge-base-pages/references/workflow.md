# Workflow Reference

## Repository Facts

- Repository root: `/Users/superone77/Code/knowledge_base_deployment`
- External content source: `~/Documents/知识库/projects/`
- Site title: `Vinci Knowledge Base`
- Site URL: `https://superone77.github.io`

## Important Files

- `src/lib/content.ts`: scan project folders, read `README.md`, `STATUS.yaml`, and `knowledge/*.md`, and derive both the human HTML view and the agent raw Markdown view
- `src/pages/agent/`: raw Markdown agent entry routes and the agent homepage
- `src/lib/markdown.ts`: convert Markdown to HTML and generate heading IDs
- `src/pages/index.astro`: site homepage and title search UI
- `src/pages/[project]/index.astro`: project landing page
- `src/pages/[project]/[doc].astro`: article page and previous/next navigation
- `scripts/deploy.mjs`: publish generated static output
- `astro.config.mjs`: default `SITE_URL`

## Normal Task Routing

### Rebuild Or Republish After Knowledge Content Changes

Do not change site code unless the user asks. Run:

```bash
npm run build
npm run deploy
```

The build step re-reads the external knowledge source automatically.

### Fix Rendering Or Navigation Problems

Inspect and edit:

- `src/lib/content.ts` for source selection, filtering, metadata, and route data
- `src/lib/markdown.ts` for heading IDs, excerpts, and Markdown rendering
- `src/pages/` for layout and route output
- `src/styles/global.css` for presentational issues

### Fix Deployment Problems

Inspect and edit:

- `scripts/deploy.mjs`
- `scripts/run-manual-deploy.sh`
- `scripts/build-update-app.sh`
- `app/Vinci Knowledge Base Update.applescript`
- `astro.config.mjs`
- `README.md` only if the user wants the workflow documentation updated too

### Maintain The Clickable Update App

Use the app build flow:

```bash
./scripts/build-update-app.sh
open "Vinci Knowledge Base Update.app"
```

Current policy:

- Use the `.app` as the preferred local trigger instead of `launchd`
- Open Terminal and show live logs while deploying
- Write logs to `~/Library/Logs/vinci-knowledge-base/manual-deploy.log`
- Use `scripts/run-manual-deploy.sh` as the only app runtime entrypoint
- If the app cannot read `~/Documents/知识库/projects`, diagnose macOS Documents permissions for Terminal or Node before changing the workflow

## Branch Model

- `main`: source code for the Astro site
- `gh-pages`: generated static output for GitHub Pages
- `master`: generated static output kept in sync for compatibility with the current repository setup

## Publish Rules

- Publish project root `README.md`
- Publish `knowledge/*.md`
- Publish raw Markdown views of `knowledge/INDEX.md` and `knowledge/*.md` on `/agent/.../*.md` routes
- Read `STATUS.yaml` as metadata only
- Exclude `REVIEW.md`, `SUBMISSION.md`, `TASKS.md`, `RESEARCH.md`, `OUTLINE.md`, and similar workflow files unless the user explicitly changes the scope
