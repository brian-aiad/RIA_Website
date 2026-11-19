# Rafla Insurance project structure

## Purpose

The Rafla Insurance Agency website, including public information pages, local SEO content, and the quote-request contact service.

## Canonical workspace

Use the existing checkout in the real local folder for this device:

| Device | Canonical folder |
| --- | --- |
| Windows | `C:\Users\kingt\Desktop\Projects\ria_website` |
| Mac | `/Users/brianaiad/Code/Projects/ria_website` |

These are actual project directories. Keep the same relative project names and committed source on both computers; the parent location differs because the Mac Desktop syncs to iCloud. Shared context stays in OneDrive. The same repository and `main` commit provide the shared source history.

At session start, open this folder, inspect `git status`, and fetch `origin`. Fast-forward only when local work can be preserved safely. Reconcile existing edits before changing branches. Do not clone another dated project folder for each task. A temporary worktree is an exceptional tool for an actual concurrent task; record and retire it after its unique work is preserved.

## Folder map

| Folder | Contents |
| --- | --- |
| `src/` | React routes, components, styles, and shared site data. |
| `public/` | Served brand, client, and editorial assets; preserve referenced runtime paths. |
| `server/`, `api/` | Shared server logic and hosted contact-request endpoint. |
| `config/` | Release and build configuration. |
| `docs/` | Client handoff, release records, and technical documentation. |
| `scripts/` | Build/prerender tools, validation, and existing API/browser checks. |

Client originals stay in their established `public/images/brand/client/` and `public/images/client/` locations. Generated editorial image provenance stays alongside its assets. Do not move source or served files merely to make framework-specific folders look like another project.

## Commands

Use Node 22. Run `npm run dev` (port 3004), `npm run lint`, `npm run build`, and `npm run test:quote-api` for normal development and validation. `npm run deploy:check` validates the selected release mode without deploying. The README documents additional SEO, imagery, and browser checks. Follow `docs/HANDOFF.md` for release and contact-service configuration.

## Shared context

Read `AI_Brain/START_HERE.md`, then `AI_Brain/Projects/rafla-insurance/CONTEXT.md`. The shared brain is in OneDrive `Downloads/AI_Brain` (on macOS, under `~/Library/CloudStorage/OneDrive-Personal`). Keep current decisions, commit, validation results, remaining work, and source-asset references there. If sync is unavailable, report that limitation and reconcile the shared note when access returns.

Keep repository documentation useful on GitHub. Keep credentials, private configuration, dependency folders, build output, and local databases out of the shared brain and commits.

## History/recovery

Git retains committed history. Prior project folders belong in `OLD_Projects/` inside the device's canonical Projects folder above, separate from the active checkout. Organization receipts and preserved snapshots may also remain in the recorded local `Code/Organization_Backups` and `Code/Archive` recovery locations during migration. Preserve unique uncommitted files and original client assets before retiring an old checkout. Summaries are an index to the evidence, not a replacement for unique source files.
