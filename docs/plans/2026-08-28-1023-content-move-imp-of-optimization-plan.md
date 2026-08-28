---
title: Move "The imp of optimization" to Moonpointing - Plan
type: content
date: 2026-08-28
topic: move-imp-of-optimization
execution: code
repos:
  - seanvoisen.com (source)
  - moonpointing.org (destination)
---

# Move "The imp of optimization" to Moonpointing

## Goal

`The imp of optimization` moves from seanvoisen.com to moonpointing.org, where it
better fits the site's stated subject ("attention, technology, and the question of
how to live"). Every URL the essay has ever lived at — and every asset URL it has
ever emitted — keeps resolving.

This is the most-linked essay on seanvoisen.com. The Browser featured it in August
2025, when it lived at `/blog/the-imp-of-optimization/`; the November 2025
blog→writing rename moved it to `/writing/the-imp-of-optimization/` behind an
existing `/blog/* → /writing/:splat` redirect. Both paths carry live inbound links.

## Current state

**Source** — `seanvoisen.com`

| | |
|---|---|
| Content | `src/writing/2025-08-01-the-imp-of-optimization.md` |
| Live URL | `https://seanvoisen.com/writing/the-imp-of-optimization/` |
| Original URL | `https://seanvoisen.com/blog/the-imp-of-optimization/` (redirects to the above) |
| Body image | `src/assets/images/watch_tri_wiranto_unsplash@1600.jpg` → `/img/<hash>-{640,800,1280,1600}.{webp,jpeg}` |
| OG image | `src/assets/images/og/watch_tri_wiranto_unsplash@1200x630.jpg` (passthrough, path is stable) |
| Stray asset | `src/assets/images/og/imp_of_optimization.jpg` — added with the essay, referenced by nothing |
| Inbound cross-link | `src/writing/2025-11-14-not-a-hobby.md:48` |
| Tags | `philosophy` (15 posts), `health` (2 posts) — both topic pages survive the removal |

**Destination** — `moonpointing.org`

Blog posts are `src/blog/YYYY-MM-DD-slug.md` with `title` / `description` / `image`
front matter; the date is stripped from the URL. Body images live under
`src/images/blog/<slug>/` (Git LFS, minimum 800px wide, enforced by
`npm run checkimages`); OG images live under `src/assets/images/og/` (not LFS).
The two markdown-it configs are identical apart from the Markua aside plugin, which
this essay does not use — the body needs no rewriting.

## Decisions

**D1 — Keep the original publication date, `2025-08-01`.** The archive should read
honestly, and the filename drives both the URL and the permanent feed entry ID, so
it cannot be changed later (moonpointing README, "never rename a content file after
its issue has been sent or its page indexed"). Consequence: the essay enters
moonpointing's single feed dated below `In praise of things`. Feed readers key on
entry ID, so subscribers will still see it arrive; it will simply sort as old.
*Alternative if you'd rather it land at the top of the feed as a republication:
name the file `2026-08-28-the-imp-of-optimization.md` instead. Say so before step 1 —
after publish, the date is frozen.*

**D2 — Leave both source images in place on seanvoisen.com.** Deleting the post
stops the eleventy-img transform from emitting the body image's `/img/…` derivatives,
which 404s them for anyone who hotlinked or archived a feed copy; deleting the OG
jpg breaks social cards already cached from the Browser feature. This repo already
has the mechanism for exactly this — `generateOrphanedImages` in
`src/_config/images.js`, written for the Moonpointing newsletter images.

**D3 — 301, no canonical stub.** A permanent redirect transfers link equity and
leaves nothing behind to maintain. No duplicate copy of the essay stays on
seanvoisen.com.

## Steps

### 1. Publish on moonpointing.org

1. Copy the body image, dropping the `@1600` suffix so derivatives read cleanly
   (`watch_tri_wiranto_unsplash-800.jpeg`, not `…@1600-800.jpeg`):

   ```
   src/assets/images/watch_tri_wiranto_unsplash@1600.jpg   (seanvoisen)
     → src/images/blog/the-imp-of-optimization/watch_tri_wiranto_unsplash.jpg
   ```

   `.gitattributes` already tracks `src/images/**/*.jpg` in LFS, so a plain
   `git add` picks up the filter. Source is 1600px, clearing the 800px floor.

2. Copy the OG image to moonpointing's naming convention:

   ```
   src/assets/images/og/watch_tri_wiranto_unsplash@1200x630.jpg   (seanvoisen)
     → src/assets/images/og/imp_of_optimization_og@1200x630.jpg
   ```

   Already 1200×630, matching the fixed `site.og.width/height`.

3. Create `src/blog/2025-08-01-the-imp-of-optimization.md` with the body verbatim
   and front matter:

   ```yaml
   ---
   title: The imp of optimization
   description: A meditation on what we lose when we excessively measure our lives.
   image: /assets/images/og/imp_of_optimization_og@1200x630.jpg
   ---
   ```

   `tags` is dropped — moonpointing registers no tags collection, so it would be
   inert. The one body image reference becomes
   `/images/blog/the-imp-of-optimization/watch_tri_wiranto_unsplash.jpg`; alt text
   and the `"Illustration by Tri Wiranto on Unsplash"` caption carry over unchanged.
   `smallCaps` stays default — the opening line takes small caps fine.

4. `npm run build` (runs `checkimages` first). Verify:
   - `dist/blog/the-imp-of-optimization/index.html` exists, canonical points at
     `https://moonpointing.org/blog/the-imp-of-optimization/`
   - `dist/images/blog/the-imp-of-optimization/watch_tri_wiranto_unsplash-800.jpeg`
     exists, and the hero `<img>` carries `loading="eager"` / `fetchpriority="high"`
   - the essay appears in `dist/feed.xml` and `dist/feed.json`, and in `sitemap.xml`
   - `npx linkinator dist/blog/the-imp-of-optimization/index.html` is clean

5. Commit, push, confirm the Netlify deploy renders the image (LFS is the usual
   failure here — a broken image means `GIT_LFS_FETCH_INCLUDE` on the Netlify site).

**The essay must be live on moonpointing.org before step 2 lands.** Otherwise the
redirect points at a 404.

### 2. Remove from seanvoisen.com

1. Delete `src/writing/2025-08-01-the-imp-of-optimization.md`.
2. Delete the orphan `src/assets/images/og/imp_of_optimization.jpg` (nothing has ever
   referenced it — verified by grep across `src/` and `_redirects`).
3. Keep `src/assets/images/og/watch_tri_wiranto_unsplash@1200x630.jpg` — passthrough
   copy holds its URL open for cached social cards.
4. Add the body image to the `orphanedImages` list in `src/_config/images.js`, with a
   line of comment saying why, so its `/img/…` derivatives keep being generated at
   byte-identical URLs after the post that referenced them is gone:

   ```js
   // The essay that referenced this moved to moonpointing.org; its /img/ URLs
   // outlive it in feed archives and aggregators.
   "src/assets/images/watch_tri_wiranto_unsplash@1600.jpg",
   ```

5. Repoint the cross-link in `src/writing/2025-11-14-not-a-hobby.md:48` from
   `/writing/the-imp-of-optimization/` to
   `https://moonpointing.org/blog/the-imp-of-optimization/`. The redirect would catch
   it, but an internal link should not need one.

6. Add to `_redirects`. The explicit `/blog/` rule must sit **above** the existing
   `/blog/* /writing/:splat 301` line — Netlify takes the first match, and putting it
   first spares the historically most-linked path a second hop:

   ```
   # The imp of optimization moved to Moonpointing
   /blog/the-imp-of-optimization https://moonpointing.org/blog/the-imp-of-optimization/ 301
   /writing/the-imp-of-optimization https://moonpointing.org/blog/the-imp-of-optimization/ 301
   ```

   Netlify normalises the trailing slash, so one rule per path covers both forms —
   matching how `/moonpointing` is already handled a few lines below.

7. `npm run build`. Verify:
   - `dist/writing/the-imp-of-optimization/` is gone
   - `dist/_redirects` carries the new rules in the right order
   - `/topics/health/` and `/topics/philosophy/` still build (2→1 and 15→14 posts)
   - the essay is out of `dist/feed.xml`, `dist/feed.json`, `dist/sitemap.xml`
   - the `/img/…` derivatives for the watch illustration are still present in `dist/`
     — this is the check that proves step 2.4 worked

8. Commit, push, deploy.

### 3. Verify in production

```sh
curl -sI https://seanvoisen.com/writing/the-imp-of-optimization/ | head -5
curl -sI https://seanvoisen.com/blog/the-imp-of-optimization/     | head -5
```

Both must return `301` with `location: https://moonpointing.org/blog/the-imp-of-optimization/`.
Then:

- Load the destination and confirm the illustration renders.
- Run the essay's URL through a social card debugger (the OG image is now
  moonpointing's) and Google's Rich Results / URL Inspection to prompt a recrawl.
- Spot-check that an old `/img/…` derivative URL from an archived feed copy still
  returns 200 on seanvoisen.com.

No Search Console change-of-address is applicable — that tool is whole-domain only.
The 301s do the work; expect Google to transfer the ranking over a few weeks.

## Out of scope

- Buttondown. Moonpointing's newsletter is hand-published per its README; nothing
  auto-sends from the feed, so this publish reaches feed subscribers only.
- Any other essay. This moves one post; whether more philosophy writing follows is a
  separate decision.
