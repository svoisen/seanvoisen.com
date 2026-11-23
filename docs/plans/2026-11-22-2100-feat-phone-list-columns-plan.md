---
title: Lists on phones — fact column, project strips - Plan
type: feat
date: 2026-11-22
topic: phone-list-columns
status: built on feat/phone-list-columns; projects switched from B3 to B1 after testing; U3 held in reserve
execution: code
---

# Lists on phones — fact column, project strips - Plan

## Goal

Below 720px every list stacks its fact (date, year, organisation) above the
title, so the eye has to step over a line of caps to reach each title. Make
the lists scannable on phones by giving the fact its own column on the left,
so titles line up down the page.

Chosen in Figma (file cJ4sPLDuJI6T0Akf3p2j4M, page "F — Lists on phones"):

- **Lists: B.** A narrow fact column on the left of every row, the entry
  beside it. The fact shows on every row, the repeated organisations on the
  work list included.
- **Projects: B3.** The year in the same left column; in the main column, a
  3:1 strip of the thumbnail over the title and summary.

Desktop (≥720px) is unchanged: there the fact already has the margin column
on the right.

## What exists today

- `global.css`, the `max-width: 719px` block (~1466): `.margin-list__row`
  becomes one column, every child `grid-row: 2`, the fact `grid-row: 1` in
  tracked caps; `.margin-list__fact:empty` hidden; `.margin-list__fact--quiet`
  shown again; row gaps `--space-m` / `--space-l`.
- `making.css` (~61): project rows stack thumbnail (3:1 strip), year, entry.
- Lists built from these rows: home (Writing, Thinking, Making, Reading,
  Working), `/writing/`, `/thinking/`, topic pages (`postList`), `/making/`
  (`projectRow`).

## U1. Fact column for every list

In the phone block, replace the stacked layout:

```css
.margin-list__row {
    grid-template-columns: var(--fact-column) minmax(0, 1fr);
    column-gap: var(--space-s);
    row-gap: 0;
}
.margin-list__row > *               { grid-column: 2; grid-row: 1; }
.margin-list__row > .margin-list__fact { grid-column: 1; grid-row: 1; }
```

- `--fact-column: 5.25rem` (84px), a new token beside the frame tokens. Sized
  to the widest fact on the site, "MADEFIRE" and "NOV 2026" in tracked caps
  at `--font-size--2`; confirm by measuring every rendered fact (no wrap).
- `align-items: baseline` (already on the row) puts the fact on the title's
  first line, as on desktop.
- The fact keeps the tracked caps it already takes on phones.
- **Empty facts** (the Reading rows): stop hiding them, so the column stays
  and the titles keep the shared edge. Remove the `:empty { display: none }`
  rule.
- **Repeated organisations**: shown on every row, as mocked. The
  `--quiet` override stays.
- Row gaps tighten now that a row no longer carries an extra line: one-line
  rows `--space-s`, rows with a summary `--space-m` — the desktop values, so
  the phone overrides for gaps can go.
- Comment block above the phone media query: rewrite "each fact … moves
  above the entry" to describe the column.

## U2. Projects: year left, strip over the title

`making.css` phone block:

- Row: the same two tracks as U1. Year `grid-column: 1; grid-row: 1`;
  thumbnail `grid-column: 2; grid-row: 1`; entry `grid-column: 2;
  grid-row: 2`, with `--space-2xs` between strip and title.
- The year aligns to the top of the strip (`align-self: start`), since there
  is no text line beside it to share a baseline with. Check in the browser
  whether it reads better there or dropped to the title's baseline
  (`grid-row: 2`); the mock has it at the top.
- Strip stays 3:1 with `object-position: var(--thumb-focus)`.
- `projectRow`'s `sizes`: `(min-width: 720px) 11rem, 100vw` →
  `(min-width: 720px) 11rem, calc(100vw - 9.5rem)` (frame padding plus the
  fact column and gap), so phones fetch a smaller image.
- Applies to `/making/` as well as the home page, from the same macro.

## U3. If it runs long

Option kept in reserve, not built unless testing calls for it: hide project
summaries on phones (`.margin-list__row--project .margin-list__summary
{ display: none }`), on the home page only or on both lists. The title and
picture carry the row; the summary is on the project page.

## Risks

- **Narrow phones.** At 320px the main column is about 170px; long titles
  ("Cosmotechnics and AI: Reading Hamid Ismailov's We Computers") take three
  or four lines. Check at 320 and 360. If it is too tight, narrow the fact
  column below ~360px (dates as "11.26"?) rather than going back to stacking.
- **Whole-row link.** The title link's `::before` covers the row
  (`position: relative` on the row), so tapping the date or strip still opens
  the post. Unchanged, but verify.

## Verification

- Screenshots at 320, 375, 393 and 719px, light and dark: home, `/writing/`,
  a topic page, `/making/`.
- Script check: no `.margin-list__fact` wraps to a second line; no
  horizontal overflow; 768px and 1440px unchanged against `main`.

## Files

- `src/_includes/css/global.css` — token, phone rules, comment.
- `src/_includes/css/making.css` — project rows on phones.
- `src/_includes/macros/margin-list.njk` — `sizes` on `projectRow`.

## Change after testing

Projects moved from B3 to **B1** (decided 2026-11-22): the thumbnail sits in
the fact column as a 3:2 crop with the year under it, and the title and
summary sit beside it in the main column, on the same edge as every other
title. `projectRow`'s phone `sizes` is now `5.25rem`.
