import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const booksYmlPath = path.join(__dirname, '../_data/books.json');
const stats = fs.statSync(booksYmlPath);

export default {
  date: stats.mtime
};

