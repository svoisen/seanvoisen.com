---
title: Site audit — CSS, HTML semantics, design consistency, code health
date: 2026-11-22
branch: feat/layout-a
status: fixed in three commits on feat/layout-a; see "Left as is" at the end
---

# Site audit (feat/layout-a)

Method: a full build checked by script for unused CSS selectors and structural
HTML (duplicate ids, heading order, alt text, list/dl content models, inline
styles, empty links), plus a file-by-file read of every layout, macro, page,
config file, stylesheet and post. Every item below was confirmed against the
file named.

## 1. Bugs worth fixing first

- **Broken links from `{{ site.url }}`** — `site.js` exports `base`, not `url`,
  so these render as root-relative paths to pages that no longer exist (one is
  papered over by a redirect):
  - `src/writing/2022-12-31-favorite-books-2022.md:9` → `/reading` (should be `/bookshelf/`)
  - `src/writing/2024-01-29-some-books-i-enjoyed-in-2023.md:20` → `/reading`
  - `src/writing/2024-04-14-design-engineering-resources.md:9` → `/about`
- **Wrong cover link** — `src/writing/2025-12-05-2025-book-recommendations.md:34`
  links *The Unbearable Lightness of Being* cover to the Socrates ISBN
  (9781250280503); should be 9780060932138 as on line 32.
- **Bookshelf years hard-coded** — `src/pages/bookshelf.njk` lists 2026…2020 by
  hand; books read in 2027 will not appear. Derive the years from `books.json`.
- **`collections[tag].reverse()`** — `src/pages/topic.njk:37` reverses Eleventy's
  shared collection array in place (order can flip between topic pages). Use
  the `| reverse` filter.
- **Margin captions skip prose pages** — the caption-in-margin rule
  (`global.css` ~1254) is scoped to `.post-content`, so captions on About and
  other `page.njk` pages still sit centred under the image.

## 2. HTML / semantics

- **Hand-rolled footnotes** in five posts using obsolete `<a name="1">`
  anchors and `<aside class="footnote">` (unstyled, so they inherit the boxed
  callout look, and have no back-links). `markdown-it-footnote` is already
  installed and styled. Convert to `[^1]`:
  `2020-12-10-flash-more-than-plug-in.md`, `2021-04-16-neat-scruffy-tools.md`,
  `2022-08-02-thoughts-on-speed.md`, `2023-10-17-beyond-chat-as-interface.md`,
  `2024-09-15-in-praise-of-randomness-james-bridle.md`.
- **Headings skip h1 → h3** (content starts at `###`):
  `thinking/2024-07-23-what-ive-been-reading-this-summer.md:7`,
  `writing/2024-04-14-design-engineering-resources.md:13`,
  `writing/2024-04-04-design-engineering-working-definition.md:31`,
  `writing/2024-03-01-recently-feb-2024.md:9`,
  `writing/2024-03-29-recently-mar-2024.md:7`,
  `writing/2024-01-29-some-books-i-enjoyed-in-2023.md:22`.
- **Inline styles on embeds** — `2024-03-29-recently-mar-2024.md:26` (bare
  iframe, no figure) and `2024-04-14-design-engineering-resources.md:32-35`
  (iframe + `figcaption style="text-align:left"`); both iframes titled
  "YouTube video player". One embed pattern (shortcode or `.figure--embed`)
  with a descriptive title.
- **Hand-written "Last updated"** — `2024-04-14-design-engineering-resources.md:11`
  uses `<small>`; posts have no `showUpdated` support like pages now do.
- **`<br>` for spacing** — `2015-10-23-lessons-year-engineering-manager.md:60`
  (`<p><br />`); the whole post is pasted HTML.
- **Topic h1 via `titlecase`** — `topic.njk:33` gives screen readers "Ai"; CSS
  uppercases it visually anyway.
- **Page subtitle is a `<div>`** — `page.njk` uses `<div class="page-subtitle">`
  where posts use `<p class="post-standfirst">`.
- Minor: one uncaptioned figure (`2020-12-10-flash…md:11`); raw `<hr>` in
  `2021-04-16-neat-scruffy-tools.md:9`; About's caption repeats its alt text.

No duplicate ids, missing alt text, invalid `dl`/`ul` children, broken
`aria-labelledby` references or empty buttons were found.

## 3. Unused CSS

- `.taglist`, `.taglist__tag` (`global.css` ~936-959) — with `macros/taglist.njk`.
- `.pullquote` (`global.css` ~961) — no content uses it.
- `.hero__sub`, `.hero__sub-label`, `.hero__sub-text` (`home.css:30-60`).
- `.section-bar__note` (`global.css` ~1041) — nothing passes a bar note now.
- `.post > .section-bar:first-child` (`global.css:1026`) — matches nothing.
- `.books-grid-rating` (`bookshelf.css`) — its markup is commented out.
- `details` / `summary` rules (`global.css` ~472-510) — no page uses them.
- Duplicate `.books-grid-title::after` block (`bookshelf.css`) with leftover
  layout properties, overriding an exclusion `global.css:344` already makes.

## 4. Non-standard patterns

- **Topic page** is built on `base` instead of `page`, no `.page-content`,
  count written as a sentence rather than a margin fact.
- **Directory and Topics** use their own list styles (`.directory-list`,
  comma-run `.tag-list`) rather than gutter-grid rows.
- **Book covers in posts** — `.float-left` without `.book-cover` in the
  phenomenology post vs `.float-right book-cover` in the recommendations post.
- **Callout** — `philosophy-for-designers.md:13-15` is the only `<aside>`
  callout; italic paragraphs stand in for subtitles on lines 18 and 40.
- **Caption alignment** — base `figcaption` is right-aligned, content
  overrides to centre, project pages go left only below 567px; 568–719px
  differs between posts and projects.
- **Project cover `sizes`** — `(min-width: 768px) 720px` matches neither the
  720px breakpoint nor the 676px column.

## 5. Stale code and smells

Safe to delete:
- `macros/taglist.njk`; filters `slice`, `reject`, `stars` (+ `filters/ratings.js`)
  — `slice` also shadows Nunjucks' built-in.
- `addLayoutAlias("atom", …)` (no such layout); `addBundle('css')` (unused).
- `barNote` in `page.njk` and the `note` parameter path of `sectionBar`.
- `type` / `post--writing|thinking` classes in `post.njk` (no CSS).
- `changeFreq` branch in the sitemap; front-matter keys `category`,
  `custom_css`; empty `src/assets/video/`; `node-fetch` dependency.

Stale comments: topic.njk ("work collection", hard-coded "22 pages"),
collections.js page count, directory.css ("no weight" while setting weight),
home.css hero description, post.njk reflowed comment line,
`bookshelf.11tydata.js` `booksYmlPath`, `scripts/generate-favicons.sh` paths.

Maintainability:
- Header + facts markup copied across `post.njk`, `project.njk`, `page.njk`;
  a `facts()` macro would hold it. `post-facts` / `gutter-grid` names no
  longer describe their use (pages, bookshelf; "margin column").
- `list-intro` lookup block copied into five index pages; `page.njk` looks
  descriptions up by `permalink` while everything else uses `page.url`.
- Home Reading rows hard-code descriptions that duplicate (and differ from)
  `navigation.json`.
- Breakpoints 567/568, 719/720 and 768 repeated across stylesheets.
- `!important` in the file-type icon rules, `.float-*`, cover `border-radius`;
  the cover box-shadow stack is duplicated in two files.
- External-link selector hard-codes `https://seanvoisen.com`.
- Theme detection script exists twice (`base.njk`, `head/theme-toggle.njk`);
  the email-obfuscation script loads on every page for one link on About.
- `body` uses `--font-family-heading` instead of `--font-family-body`.
- Feeds hard-code `title: "Sean Voisen"`; sitemap loop variable shadows `page`.

## Left as is

Fixed in `fix: audit bugs and dead code`, `fix(content): …` and
`refactor: …` on feat/layout-a, except:

- **Directory and Topics list styles** — different content (a sitemap with
  descriptions, a run of tags) that the margin rows do not fit; kept.
- **External-link selector** still names `https://seanvoisen.com`: CSS cannot
  read `site.base`. Absolute links to the site are rare.
- **Uncaptioned figures** (Flash post screenshot, the March 2024 video) and
  the About caption repeating its alt text — need words from the author.
- **philosophy-for-designers.md** callout and italic subtitles — authored
  content, left to the author.
- **2015-10-23-lessons-year-engineering-manager.md** is still pasted HTML;
  `<br>` inside poems and transcripts is legitimate and stays.
- **Dependencies**: `node-fetch` (addbook.js imports it; Node's global
  `fetch` would do), the markua-aside plugin under `dependencies` rather
  than `devDependencies`, and `scripts/generate-favicons.sh` pointing at
  old paths — package and script changes deferred to their own commit.
