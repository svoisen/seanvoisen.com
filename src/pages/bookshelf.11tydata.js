import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const booksYmlPath = path.join(__dirname, '../_data/books.json');
const stats = fs.statSync(booksYmlPath);

export default {
  date: stats.mtime,
  eleventyComputed: {
    // The one fact worth keeping from the metadata aside the section bar
    // replaces. It rides in the bar's right-hand slot.
    barLink: (data) => `${data.books.books.length} books`
  }
};
