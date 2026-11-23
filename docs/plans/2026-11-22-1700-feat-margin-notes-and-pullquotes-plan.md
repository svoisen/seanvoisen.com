---
title: Margin notes and pull quotes - Plan
type: feat
date: 2026-11-22
topic: margin-notes-and-pullquotes
status: done — option C for phones (notes after their paragraph); built on feat/layout-a
execution: code
---

# Margin notes and pull quotes - Plan

## Goal

Use the margin column inside posts, not just beside the header:

1. **Footnotes become margin notes** where the margin exists (≥720px): each
   note sits beside the line that references it instead of in a list at the
   end of the post.
2. **Pull quotes**: a short line from the essay, repeated larger in the
   margin beside the passage it comes from, on a handful of long essays.

Both stay quiet: no new colour, no motion, the margin's existing type
(UI face, deemphasized) — in keeping with the site's minimal direction.

## What exists today

- `markdown-it-footnote` renders `[^1]` as `<sup class="footnote-ref"><a
  href="#fn1" id="fnref1">1</a></sup>` and a `<section class="footnotes">` list
  at the end with back-links (`src/_config/plugins/markdown.js`; styles in
  `global.css` `.footnotes`).
- Six posts use footnotes, about ten notes in all. Every reference sits in a
  plain paragraph, nearly always at the end of a sentence. Every note is a
  single paragraph of inline content (text, links, emphasis).
- The margin already holds: the post's facts (overflowing past the header
  since `23b3d40`), captions beside captioned figures, and wide figures that
  span both columns.

## U1. Margin notes

### Markup (one copy of each note)

A markdown-it core rule, run after the footnote plugin, rewrites each
reference into a reference plus the note itself, inline, in the same
paragraph:

```html
…is often non-trivial<sup class="note-ref" id="fnref1"><a href="#fn1">1</a></sup><span class="note" id="fn1" role="note"><span class="note__number">1</span> <span class="visual-hidden">Note: </span>This is just a singular example…</span>. But it must be done.
```

- One copy only: no duplicated text for assistive technology, no hidden
  list to keep in sync. `role="note"` plus the hidden "Note:" tells a screen
  reader it has stepped out of the sentence.
- Valid HTML: a `<span>` inside `<p>`, holding only phrasing content — true
  of every note on the site today. The rule fails the build if a note ever
  contains block content (a list, a second paragraph), rather than emitting
  invalid markup.
- The end-of-post `<section class="footnotes">` is no longer emitted.
- The rule replaces the plugin's renderer only for posts; `[^1]` syntax in
  markdown is unchanged, so no content edits.

### Layout

- **≥720px:** `.note` is `display: block; float: right; clear: right;` with
  `width: var(--margin-width)` and `margin-right: calc(-1 * (var(--column-gap)
  + var(--margin-width)))` — the same reach the captions use. Its top meets
  the line holding the reference. Set like the captions: UI face,
  `--font-size--1`, deemphasized, number in tracked caps ahead of the text.
- **<720px:** see Decision 1.
- The reference number stays a link to the note (useful on phones, harmless
  in the margin, where it lands on the note beside it).

### Files

- `src/_config/plugins/markdown.js` — the core rule and renderer overrides.
- `src/_includes/css/global.css` — `.note`, `.note-ref`; remove `.footnotes*`.
- No content changes.

## U2. Pull quotes

### Markup

A paired shortcode, placed between paragraphs where the quote should sit:

```njk
{% pullquote %}He didn’t paint mountains; he painted his perception of mountains.{% endpullquote %}
```

renders

```html
<aside class="pullquote" aria-hidden="true"><p>He didn’t paint mountains; …</p></aside>
```

`aria-hidden` because the line is a repetition of text the reader also meets
in the prose; a screen reader would otherwise read it twice.

### Layout

- **≥720px:** floated into the margin like the notes (`float: right; clear:
  right`, same negative margin), so a pull quote and a note never overlap —
  the later one stacks below. Set in the heading face at `--font-size-1`,
  heading weight, tight leading, opened by a 1px hairline like the section
  bars. No quotation marks, no colour.
- **<720px:** see Decision 2.

### Files

- `src/_config/shortcodes.js` + `eleventy.config.js` — `pullquote` paired
  shortcode.
- `src/_includes/css/global.css` — `.pullquote`.
- The chosen posts (see Candidates).

## U3. Keeping the margin from colliding

Everything that can occupy the margin, and how they coexist:

| Occupant | Rule |
| --- | --- |
| Notes, pull quotes | Floats with `clear: right`: they stack, never overlap. |
| Captioned and wide figures | Get `clear: right` at ≥720px, so a figure starts below any note or pull quote still running down the margin. The cost is a gap in the main column when that happens; acceptable, and rare. |
| Post facts (header) | Overflow into the margin by design. A note or pull quote in the first paragraph could meet them: the pull-quote rule below keeps quotes out of the first two paragraphs; for notes, add `clear: right` against a zero-width float the header leaves (or a `min-height` on the first note's position) — settle in implementation, verified by the check below. |

**Verification:** a Playwright script builds the site, visits every post at
1440 and 834, and fails if any two margin boxes (facts, notes, pull quotes,
captions) intersect, or if any margin box extends past the right edge of
the frame. Plus screenshots of the six footnoted posts and the pull-quote
posts at 1440, 834 and 393, light and dark.

## Pull quote candidates

Read from the ten longest essays; each sentence checked verbatim against its
file. Rules: the author's own words, ~10–25 words, stands alone, not in the
first two paragraphs or the last, gives nothing away.

Recommended first set (six):

1. **Cézanne's doubts** — “He didn’t paint mountains; he painted his
   perception of mountains.” (L90). Nothing else in the margin nearby.
2. **Design system AI readiness** — “It is the humans in the system who hold
   up the ceiling and determine how high it goes.” (L37, anchor L35).
3. **Programming in the swamp** — “We're trying to wade through a swamp still
   using tools designed for the forest.” (L54, anchor L52). Long blockquote
   two paragraphs above.
4. **Design for lingering** — “There’s nothing inherent in technology that
   reinforces the temporal crisis other than how we have chosen to design
   it.” (L54, anchor L56, clear of the blockquote run at L40–52).
5. **Thoughts on speed** — “Speed is not a feature; you don’t build software
   and then tack on speed as an enhancement later.” (L45).
6. **Cosmotechnics and AI** — “Industrial AI is the Heideggerian nightmare
   unleashed on culture.” (L50, anchor L48).

Also possible: a second quote in *Design for lingering* (L104, “Deep in
sesshin…”) and *Cosmotechnics* (L96, “cottage AI authorship…”); *Neat and
scruffy tools* (L67, “I feel there is a place for more scruffy software.”);
*Not a hobby* (L68). Weak or no: *Promises and perils of AI ghostwriters*
(its best lines are other writers'), *Phenomenology and the impossibility of
experience design* (nothing short stands alone).

Found in passing: `2023-01-15-promises-perils-ai-ghostwriters.md:59` reads
“cheapen our relationship our readers” — missing “with”.

## Sequencing

U1, then U3's float/clear rules and the check, then U2 — one commit each.
Independent of the deferred Thinking→Writing merge (no URLs change).

## Decisions

1. **Notes on phones (<720px): C, after the paragraph.** (Decided 2026-11-22.) Mocked in Figma, page
   "E — Notes on phones" (file cJ4sPLDuJI6T0Akf3p2j4M):
   - A: today's numbered list at the end of the post (needs a second,
     hidden copy of every note and per-width link targets).
   - B: the note opens right after the sentence that references it — the
     markup above; one copy, beside its reference line in the margin.
   - C: the note follows the whole paragraph. One copy too, but the note
     then sits after the paragraph in the markup, so in the margin it lines
     up with the paragraph's end (or the next paragraph) rather than with
     the line holding its reference.
2. **Pull quotes on phones: hidden.** (Decided 2026-11-22.)
3. **Pull quotes: all ten listed** — the six recommended plus Design for
   lingering L104, Cosmotechnics L96, Neat and scruffy tools L67 and Not a
   hobby L68. Not Promises and perils or Phenomenology. (Decided
   2026-11-22.)
