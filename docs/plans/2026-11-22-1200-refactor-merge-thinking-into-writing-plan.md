---
title: Merge Thinking into Writing - Plan
type: refactor
date: 2026-11-22
topic: merge-thinking-into-writing
status: deferred — start after the layout A branch (feat/layout-a) has merged
execution: code
---

# Merge Thinking into Writing - Plan

## Goal

One stream of posts under `/writing/`. Thinking stops being a separate
section: its 25 posts move into `src/writing/`, every old URL redirects in a
single hop, and no feed reader sees an old post as new.

Decided: merge the two sections, no word counts or reading times in the lists
(word counts were mocked in Figma, page "A3", and rejected as too busy).

## Sequencing

Do this after `feat/layout-a` (Plex type, Making section, left-anchored layout)
has merged to `main`, on its own branch. The layout branch touches
`home.njk`, `navigation.json` and the gutter-list macros, so starting before it
lands means resolving the same files twice.

Re-run the inventory below at the start: post counts and dates will have moved
on since this was written.

## Findings (as of 2026-11-22)

### Feed IDs: only the older posts are at risk

`src/_config/filters/rssId.js` gives entry IDs two ways, split at 2025-11-21:

- **Posts on or after 2025-11-21** use `tag:seanvoisen.com,<date>:<md5(title+date)>`.
  A move does not change them. (6 Thinking posts at the time of writing.)
- **Posts before 2025-11-21** use their URL with `/writing/` rewritten to
  `/blog/` and `/thinking/` to `/stream/`, choosing between the two by the
  source file's folder (`page.filePathStem`), e.g.
  `https://seanvoisen.com/stream/2024-05-19-eschewing-devices-and-living-well/`.
  (19 Thinking posts.) Moving a file into `src/writing/` changes both the
  folder test and the URL, so the ID would become
  `…/blog/eschewing-devices-and-living-well/` and feed readers would show the
  post again as new.

### URLs change shape

`src/writing/writing.json` sets `permalink: "/{{ page.filePathStem }}/index.html"`,
which in this build drops the date prefix (`/writing/programming-in-the-swamp/`).
Thinking has no permalink override and keeps the date
(`/thinking/2024-05-19-eschewing-devices-and-living-well/`). A moved post
therefore lands at `/writing/eschewing-devices-and-living-well/`.

Netlify placeholders match whole path segments, so no single splat rule can
strip the date. Every post needs its own redirect line.

No slug collisions: none of the 25 dateless Thinking slugs exists in
`/writing/` today. Re-check before moving.

### Everything that references Thinking

- `src/_config/collections.js` — `thinking` collection; `unified` globs both folders
- `eleventy.config.js` — `addCollection("thinking", …)`
- `src/_config/filters/rssId.js` — folder test (see above)
- `src/_layouts/post.njk` — sets `type` Writing/Thinking from the folder;
  output class `post--{{ type }}`. No CSS depends on `post--thinking`.
- `src/pages/thinking.njk` — the `/thinking/` index
- `src/pages/home.njk` — the Thinking section and its "All posts" link
- `src/_data/navigation.json` — Thinking nav/Directory entry; Topics
  description ("…essays and thinking posts.")
- `src/pages/topic.njk` — `description: "Essays and thinking posts about {{ tag }}."`
- `_redirects` — "Oopsies" entries target a dated `/thinking/` URL;
  `/stream/* /thinking/:splat`; `/thinking/feed.*` rules
- Internal links to `/thinking/` URLs in post content (three at the time of
  writing): an absolute link to `it-takes-a-village` in a Writing post, and
  relative links in `lingering-while-the-agent-runs` and `finishing`.
  Find them again with `grep -rn "/thinking/" src`.

Not affected: `site.js` description ("Thinking and writing about…" is prose),
the tags collection (reads all items), the sitemap (reads `getAll()`), OG
images (explicit paths in front matter).

## Units

Three commits. Each ends with a clean build.

### U1. Pin the legacy feed IDs (no output change)

1. Build `main` and snapshot every entry `<id>` from `dist/feed.xml` and every
   `"id"` from `dist/feed.json`.
2. Add `feedId:` front matter to each pre-cutoff Thinking post, set to its
   current ID.
3. `genRSSId` returns `post.data.feedId` when present, before any other logic.
4. Rebuild and diff against the snapshot. **Zero differences** is the gate.

### U2. Move the posts and add redirects

1. `git mv src/thinking/*.md src/writing/` (keep filenames, keep history);
   delete `src/thinking/thinking.json`.
2. Generate the redirect block with a script from the actual file list, never
   by hand. Place it above the existing splat rules (Netlify takes the first
   match):
   - `/thinking/<dated-slug>  /writing/<slug>  301` × 25
   - `/stream/<dated-slug>  /writing/<slug>  301` × 25, so legacy `/stream/`
     links take one hop rather than two
   - `/thinking/  /writing/  301`
3. Retarget the "Oopsies" entries to the new URL.
4. Replace `/stream/* /thinking/:splat` with a fallback to `/writing/`, and add
   a `/thinking/*` fallback (see open decision 4).
5. Keep the `/thinking/feed.*` and `/stream/feed.*` → `/feed.*` rules.
6. Update the in-content links to point at the new URLs directly.

### U3. Templates, navigation, copy

- `collections.js` / `eleventy.config.js`: remove `thinking`; `unified` reads
  `src/writing/` only.
- `post.njk`: drop the type switch (or hardcode Writing).
- Delete `src/pages/thinking.njk`.
- `home.njk`: one Writing section from the merged collection, its last line
  "All writing →" (the layout branch's `listMore`).
- `navigation.json`: remove the Thinking entry; rewrite Writing's description;
  set Writing `hideOnMobile` per decision 3; update the Topics description.
- `topic.njk`: description reads "Writing about {{ tag }}."

## Verification

1. **URL diff** against a `main` build: exactly the 25 dated `/thinking/…`
   pages and `/thinking/index.html` removed, exactly 25 `/writing/…` pages
   added, nothing else.
2. **Redirect check** (script): every removed URL and every `/stream/<dated>`
   path resolves through `_redirects` to a page that exists in `dist/`, in one
   hop. Paths with and without the trailing slash.
3. **Feeds:** entry IDs identical to the U1 snapshot; entry count unchanged.
4. **No stale links:** `grep -r "/thinking/" dist` finds nothing except feed
   IDs that intentionally keep `/stream/`.
5. **Browser:** home and `/writing/` at 1440, 834 and 393, light and dark.

## Open decisions (ask before U3)

1. Writing's description. Current: "Longer essays and personal updates."
   Suggested: "Essays, notes, and personal updates."
2. How many posts the home page lists. Today 6 essays + 4 Thinking posts;
   suggested 8 from the merged stream.
3. Whether Writing shows in the phone nav once Thinking is gone (it fits).
4. Unknown `/thinking/…` URLs: fall back to `/writing/`, or 404.
