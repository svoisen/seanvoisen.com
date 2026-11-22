import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The page changes when the book list does, so its date is the data file's.
const booksJsonPath = path.join(__dirname, '../_data/books.json');
const stats = fs.statSync(booksJsonPath);

export default {
  date: stats.mtime,
  eleventyComputed: {
    // Every year with a book in it, newest first, so a new year's shelf
    // appears as soon as its first book is added.
    bookYears: (data) => [...new Set(data.books.books.map((book) => book.year))].sort((a, b) => b - a)
  }
};
