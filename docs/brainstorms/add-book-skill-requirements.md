# Add Book Skill — Requirements

**Date:** 2026-04-30  
**Scope:** Lightweight  
**Status:** Draft

## Problem

Adding a book requires switching to a terminal, running `npm run addbook`, and answering interactive prompts. The existing `scripts/addbook.js` works well — the friction is leaving the pi conversation, not the script's capabilities.

## Solution

A pi skill that lets the user say something like "add book [title] by [author], ISBN [number]" from within a conversation. The skill collects missing details (rating, year, favorite) via `ask_user`, then runs the existing `addbook.js` script with the ISBN.

## Decisions

| Decision | Choice |
|---|---|
| ISBN source | User provides ISBN as part of their request |
| Metadata lookup | Handled by existing `addbook.js` (Google Books API) |
| Image download & resize | Handled by existing `addbook.js` (3 sizes: 160/320/640 webp), with Bookshop.org as primary cover source |
| Rating / year / favorite | Skill collects via `ask_user` conversation |
| Script invocation | Run `npm run addbook` with ISBN piped or passed as arg — requires a small change to `addbook.js` to accept ISBN as a CLI argument |

## Behavior

1. **Trigger** — User says something matching "add book" with a title, author, and/or ISBN
2. **Parse** — Skill extracts ISBN from the request. If no ISBN, asks for it.
3. **Collect missing fields** — Using `ask_user`, ask one at a time:
   - Rating (1–5, half stars)
   - Year read (default: current year)
   - Favorite? (default: no)
4. **Run script** — Execute `addbook.js` with ISBN and collected fields. The script must accept these as CLI args or stdin so it can run non-interactively.
5. **Confirm** — Report success: title, slug, cover images created, entry added to `books.json`

## Cover Image Source Change

`addbook.js` currently tries Google Books sources first, then Open Library. Add **Bookshop.org as the primary (first) source** using the URL pattern:

```
https://images-us.bookshop.org/ingram/{isbn-13}.jpg
```

Source order should become:
1. Bookshop.org (new, primary)
2. Google Books zoom=3 (existing)
3. Google Books publisher URL (existing)
4. Open Library (existing)

## Script Modification Required

`scripts/addbook.js` currently uses `prompts` for all input. It needs a **non-interactive mode** that accepts:
- `--isbn <isbn-13>` (required)
- `--rating <1-5>`
- `--year <YYYY>`
- `--favorite` (flag)

When CLI args are provided, skip all interactive prompts. When no args are given, behave exactly as today (backward compatible).

## Success Criteria

- User can add a book from a pi conversation by providing title + ISBN
- Rating, year, and favorite are collected via `ask_user`
- No terminal switch required
- Existing interactive workflow untouched
- Cover images appear in `src/assets/images/book_covers/` at 160/320/640 webp
- Entry appears in `src/_data/books.json`

## Non-Goals

- Title+author search to auto-discover ISBN
- Editing or removing existing books
- Multiple books at once
