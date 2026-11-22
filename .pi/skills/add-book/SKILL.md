---
name: add-book
description: Add a book to the collection by ISBN. Use when the user says "add book", "add a book", or provides a book title and ISBN to add to their reading list. Collects rating, year read, and favorite status, then runs the addbook script.
---

# Add Book

Add a book to the reading collection from within a pi conversation.

## Usage

The user provides a book title/author and ISBN. Collect any missing details, then run the non-interactive addbook script.

## Workflow

### 1. Extract ISBN

From the user's message, extract the ISBN-13. If no ISBN is provided, ask for it.

### 2. Collect missing details

Use `ask_user` to ask **one at a time** for any details the user didn't provide:

- **Rating** — 1–5, half stars allowed (e.g., 3.5). Options: 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5
- **Year read** — Default is current year (2026)
- **Favorite?** — Yes or no (default no)

### 3. Run the addbook script

```bash
npm run addbook -- --isbn <isbn> --rating <rating> --year <year> [--favorite]
```

Examples:
```bash
# Not a favorite
npm run addbook -- --isbn 9780062936066 --rating 4 --year 2026

# Favorite
npm run addbook -- --isbn 9780062936066 --rating 4.5 --year 2026 --favorite
```

### 4. Confirm

Report what was added: title, author, slug, and that cover images were created.

## File Locations

- Book data: `src/_data/books.json`
- Cover images: `src/assets/images/book_covers/` (3 sizes: @160, @320, @640 webp)
- Addbook script: `scripts/addbook.js`
