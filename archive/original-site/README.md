# Archived: Original A.W. Vaughan Company Business Website

This directory is a **frozen snapshot** of the original business website for
The A.W. Vaughan Company (gravel driveway repair / drainage contractor in
Virginia Beach) before the site was refactored into a personal landing page
for Alex Vaughan.

- **Snapshot taken from commit:** `127a7b3a20a9ba5c97203948c9a631e015d047ed`
- **Snapshot date:** 2026-07-13
- **What's here:** the complete original `src/` and `static/` trees.

This directory is intentionally **excluded** from the build, type-checking,
and linting (see `tsconfig.json`, `eslint.config.js`, `.prettierignore`). It is
kept purely as reference in case the business site ever needs to be restored.

## How to restore the original site

The fastest, most reliable way is via git history — the entire original site
lives at the commit above:

```bash
# See the original state
git checkout 127a7b3a20a9ba5c97203948c9a631e015d047ed

# Or restore just the app source onto a new branch
git checkout -b restore-business-site 127a7b3a20a9ba5c97203948c9a631e015d047ed
```

Alternatively, copy the snapshot in this folder back into place:

```bash
rm -rf src static
cp -r archive/original-site/src src
cp -r archive/original-site/static static
```

Note that the original site also depended on the MS365 contact-form API,
Meta Pixel / Conversions API tracking, and business-specific config
(`src/lib/config/constants.ts`). Those were removed from the live site during
the refactor but remain intact in this snapshot. See the original `CLAUDE.md`
in git history for full context.
