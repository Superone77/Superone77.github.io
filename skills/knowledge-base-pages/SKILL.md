---
name: knowledge-base-pages
description: Build, repair, verify, and deploy the Vinci Knowledge Base Astro site in this repository. Use when updating the site after knowledge content changes under `~/Documents/知识库/projects/`, when fixing route, Markdown rendering, search, or deployment issues, or when republishing the site to `https://superone77.github.io`.
---

# Knowledge Base Pages

## Overview

Maintain the Astro site in this repository and republish it to GitHub Pages. Treat `~/Documents/知识库/projects/` as the default external content source and this repo as the site/render/deploy layer.

## Quick Start

- Work from the repository root: `/Users/superone77/Code/knowledge_base_deployment`
- Run `git status --short` before changing anything
- Read [references/workflow.md](references/workflow.md) when you need the exact file map, branch model, or deploy commands
- Read only the relevant repo files for the task:
  - `src/lib/content.ts` for source scanning and publish filters
  - `src/lib/markdown.ts` for Markdown rendering and heading IDs
  - `src/pages/` and `src/styles/global.css` for page structure and presentation
  - `scripts/deploy.mjs` for GitHub Pages publishing behavior

## Update Flow

1. Determine whether the request is about site code or only about republishing updated knowledge content.
2. If the request is only to refresh the site after source knowledge changed, avoid changing site code; rebuild and redeploy from this repo so it re-reads `~/Documents/知识库/projects/`.
3. If the request is about rendering, routing, navigation, search, or deploy behavior, edit this repo and keep `main` as the source branch.
4. Keep the publish scope aligned with the current site policy:
   - Publish project root `README.md`
   - Publish `knowledge/*.md`
   - Read `STATUS.yaml` for metadata
   - Do not expose `REVIEW.md`, `SUBMISSION.md`, `TASKS.md`, `RESEARCH.md`, or similar workflow files unless the user explicitly changes that rule

## Verify And Deploy

- Run `npm run build` after site changes and before every deploy
- Run `npm run deploy` when the user asks to publish
- Treat `npm run deploy` as the normal publish path; it builds the site and publishes generated static output to both `gh-pages` and `master`
- Push `main` separately only when the user wants the source branch updated on GitHub
- Verify `git status --short` after deploy-related work so no unintended repo changes remain

## Guardrails

- Keep the default site URL at `https://superone77.github.io` unless the user changes domains
- Use `KB_SOURCE_DIR` only when the source knowledge path changes from the default
- Keep this repo ASCII-first except where existing Chinese paths or content already require Unicode
- Preserve the branch split:
  - `main` for source code
  - `gh-pages` and `master` for generated static output

## References

- Read [references/workflow.md](references/workflow.md) for the exact repository structure, command set, branch behavior, and typical task routing.
