#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import prompts from 'prompts';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKS_JSON_PATH = path.join(__dirname, '../src/_data/books.json');
const BOOK_COVERS_DIR = path.join(__dirname, '../src/assets/images/book_covers');
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

/**
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '_')      // Replace spaces with underscores
        .replace(/-+/g, '_')       // Replace hyphens with underscores
        .replace(/_+/g, '_')       // Replace multiple underscores with single
        .replace(/^_|_$/g, '');    // Trim underscores from start/end
}

/**
 * Sleep for a given number of milliseconds
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch with retry and exponential backoff for rate-limited APIs
 */
async function fetchWithRetry(url, maxRetries = 3, baseDelay = 2000) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const response = await fetch(url);

        if (response.ok) {
            return response;
        }

        if (response.status === 429 && attempt < maxRetries) {
            const delay = baseDelay * Math.pow(2, attempt);
            console.log(`  Rate limited, retrying in ${delay / 1000}s... (attempt ${attempt + 1}/${maxRetries})`);
            await sleep(delay);
            continue;
        }

        return response;
    }
}

/**
 * Fetch book data from Open Library API (fallback when Google Books is rate-limited)
 * Tries multiple endpoints for better coverage
 */
async function fetchBookDataOpenLibrary(isbn) {
    // Try multiple Open Library endpoints
    const endpoints = [
        // Endpoint 1: Search API (often has better coverage)
        async () => {
            const url = `https://openlibrary.org/search.json?isbn=${isbn}`;
            const response = await fetch(url);
            if (!response.ok) return null;
            
            const data = await response.json();
            if (!data.docs || data.docs.length === 0) return null;
            
            const doc = data.docs[0];
            return {
                title: doc.title,
                authors: doc.author_name ? doc.author_name.join(', ') : 'Unknown',
                coverUrl: doc.cover_i 
                    ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
                    : null,
                bookId: doc.key?.replace('/books/', '') || null,
                isbn13: isbn
            };
        },
        
        // Endpoint 2: Bibkeys API
        async () => {
            const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
            const response = await fetch(url);
            if (!response.ok) return null;
            
            const data = await response.json();
            const key = `ISBN:${isbn}`;
            const book = data[key];
            if (!book) return null;

            return {
                title: book.title + (book.subtitle ? `: ${book.subtitle}` : ''),
                authors: book.authors ? book.authors.map(a => a.name).join(', ') : 'Unknown',
                coverUrl: book.cover?.large || book.cover?.medium || null,
                bookId: null,
                isbn13: isbn
            };
        },
        
        // Endpoint 3: ISBN JSON endpoint
        async () => {
            const url = `https://openlibrary.org/isbn/${isbn}.json`;
            const response = await fetch(url);
            if (!response.ok) return null;
            
            const data = await response.json();
            // Fetch author names if available
            let authors = 'Unknown';
            if (data.authors && data.authors.length > 0) {
                const authorResponses = await Promise.all(
                    data.authors.map(a => fetch(`https://openlibrary.org${a}.json`).then(r => r.ok ? r.json() : null))
                );
                authors = authorResponses
                    .filter(a => a?.name)
                    .map(a => a.name)
                    .join(', ') || 'Unknown';
            }
            
            return {
                title: data.title || 'Unknown',
                authors: authors,
                coverUrl: data.covers?.[0] 
                    ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
                    : null,
                bookId: data.key?.replace('/books/', '') || null,
                isbn13: isbn
            };
        }
    ];
    
    for (let i = 0; i < endpoints.length; i++) {
        try {
            console.log(`  Trying Open Library endpoint ${i + 1}/${endpoints.length}...`);
            const result = await endpoints[i]();
            if (result && result.title !== 'Unknown') {
                console.log(`  ✓ Found via Open Library endpoint ${i + 1}`);
                return result;
            }
        } catch (error) {
            console.log(`  ✗ Endpoint ${i + 1} failed: ${error.message}`);
        }
    }
    
    return null;
}

/**
 * Fetch book data from Google Books API
 */
async function fetchBookData(isbn) {
    const url = `${GOOGLE_BOOKS_API}?q=isbn:${isbn}`;

    try {
        const response = await fetchWithRetry(url);
        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return null;
        }

        const book = data.items[0].volumeInfo;
        const bookId = data.items[0].id;

        // Get thumbnail URL and upgrade to zoom=3 for higher quality
        let coverUrl = book.imageLinks?.thumbnail?.replace('http:', 'https:') || null;
        if (coverUrl) {
            coverUrl = coverUrl.replace('zoom=1', 'zoom=3');
        }

        return {
            title: book.title,
            authors: book.authors ? book.authors.join(', ') : 'Unknown',
            coverUrl: coverUrl,
            bookId: bookId,
            isbn13: isbn
        };
    } catch (error) {
        console.error('Error fetching from Google Books:', error.message);

        // Fallback to Open Library
        console.log('\nTrying Open Library as fallback...');
        const olData = await fetchBookDataOpenLibrary(isbn);
        if (olData) {
            console.log('Found book via Open Library');
            return olData;
        }
        
        return null;
    }
}

/**
 * Convert ISBN-13 to ISBN-10
 */
function isbn13to10(isbn13) {
    if (!isbn13 || isbn13.length !== 13) return null;
    const digits = isbn13.slice(3, 12); // Drop the 978 prefix and the check digit
    // Calculate ISBN-10 check digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(digits[i]) * (10 - i);
    }
    const check = (11 - (sum % 11)) % 11;
    const checkChar = check === 10 ? 'X' : check.toString();
    return digits + checkChar;
}

/**
 * Try to get the highest quality cover image from multiple sources
 */
async function getHighestQualityCover(coverUrl, bookId, isbn) {
    const sources = [];

    // Source 1: Amazon (most reliable, no bot protection)
    const isbn10 = isbn13to10(isbn);
    if (isbn10) {
        sources.push({
            name: 'Amazon',
            url: `https://m.media-amazon.com/images/P/${isbn10}.01.LZZZZZZZ.jpg`
        });
    }

    // Source 2: Google Books with zoom=4 (high quality when available)
    if (bookId) {
        sources.push({
            name: 'Google Books (zoom=4)',
            url: `https://books.google.com/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=4&source=gbs_api`
        });
    }

    // Source 3: Google Books with zoom=3 (from API thumbnail)
    if (coverUrl) {
        sources.push({ name: 'Google Books (zoom=3)', url: coverUrl });
    }

    // Source 4: Google Books publisher content URL
    if (bookId) {
        sources.push({
            name: 'Google Books (publisher)',
            url: `https://books.google.com/books/publisher/content/images/frontcover/${bookId}?fife=w800-h1200&source=gbs_api`
        });
    }

    // Source 5: Open Library large cover
    if (isbn) {
        // Source 5: Open Library covers
        sources.push({
            name: 'Open Library covers',
            url: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
        });
        
        // Source 6: Open Library with M size (medium)
        sources.push({
            name: 'Open Library M',
            url: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
        });
        
        // Source 7: Bookshop.org cover (uses ISBN)
        sources.push({
            name: 'Bookshop.org',
            url: `https://cdn.bookshop.org/spree/products/${isbn}/preview.jpg`
        });
    }

    // Try each source until we find a working one
    for (const source of sources) {
        try {
            console.log(`  Trying ${source.name}...`);
            const response = await fetch(source.url);

            if (response.ok) {
                const buffer = await response.arrayBuffer();

                // Validate the image is not too small
                const metadata = await sharp(Buffer.from(buffer)).metadata();

                if (metadata.width >= 300) {
                    console.log(`  ✓ Success! Using ${source.name} (${metadata.width}x${metadata.height})`);
                    return { buffer, source: source.name };
                } else {
                    console.log(`  ✗ Image too small (${metadata.width}px), trying next source...`);
                }
            }
        } catch (error) {
            console.log(`  ✗ Failed: ${error.message}`);
        }
    }

    return null;
}

/**
 * Download and process cover image
 */
async function downloadAndProcessCover(coverUrl, slug, bookId, isbn) {
    try {
        // Try to get the highest quality cover from multiple sources
        const result = await getHighestQualityCover(coverUrl, bookId, isbn);

        if (!result) {
            console.warn('Could not find a high-quality cover image from any source');
            return false;
        }

        // Ensure the book covers directory exists
        await fs.mkdir(BOOK_COVERS_DIR, { recursive: true });

        // Generate three sizes: 160, 320, 640 pixels wide
        const sizes = [160, 320, 640];

        for (const size of sizes) {
            const outputPath = path.join(BOOK_COVERS_DIR, `${slug}@${size}.webp`);

            await sharp(Buffer.from(result.buffer))
                .resize(size, null, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .webp({ quality: 85 })
                .toFile(outputPath);

            console.log(`  Created ${slug}@${size}.webp`);
        }

        return true;
    } catch (error) {
        console.error('Error processing cover image:', error.message);
        return false;
    }
}

/**
 * Load books.json
 */
async function loadBooks() {
    try {
        const data = await fs.readFile(BOOKS_JSON_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading books.json:', error.message);
        throw error;
    }
}

/**
 * Save books.json
 */
async function saveBooks(booksData) {
    try {
        await fs.writeFile(
            BOOKS_JSON_PATH,
            JSON.stringify(booksData, null, 2) + '\n',
            'utf-8'
        );
        console.log('Successfully updated books.json');
    } catch (error) {
        console.error('Error saving books.json:', error.message);
        throw error;
    }
}

/**
 * Check if book already exists
 */
function bookExists(books, isbn, slug) {
    return books.some(book =>
        book.isbn_13 === isbn || book.slug === slug
    );
}

/**
 * Parse CLI arguments into an options object
 */
function parseCliArgs() {
    const args = process.argv.slice(2);
    const opts = { isbn: null, rating: null, year: null, favorite: false, title: null, author: null };

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--isbn' && args[i + 1]) {
            opts.isbn = args[++i].replace(/[-\s]/g, '');
        } else if (args[i] === '--rating' && args[i + 1]) {
            opts.rating = parseFloat(args[++i]);
        } else if (args[i] === '--year' && args[i + 1]) {
            opts.year = parseInt(args[++i], 10);
        } else if (args[i] === '--favorite') {
            opts.favorite = true;
        } else if (args[i] === '--title' && args[i + 1]) {
            opts.title = args[++i];
        } else if (args[i] === '--author' && args[i + 1]) {
            opts.author = args[++i];
        }
    }

    return opts;
}

/**
 * Main function
 */
async function main() {
    const cliArgs = parseCliArgs();
    const nonInteractive = cliArgs.isbn !== null;

    console.log('=== Add Book to Collection ===\n');

    let isbn;

    // Step 1: Get ISBN
    if (nonInteractive) {
        isbn = cliArgs.isbn;
        if (!/^\d{13}$/.test(isbn)) {
            console.error('Error: Invalid ISBN-13. Must be 13 digits.');
            process.exit(1);
        }
        console.log(`ISBN: ${isbn}`);
    } else {
        const isbnResponse = await prompts({
            type: 'text',
            name: 'isbn',
            message: 'Enter ISBN-13 (13 digits):',
            validate: value => {
                const cleaned = value.replace(/[-\s]/g, '');
                return /^\d{13}$/.test(cleaned) ? true : 'Please enter a valid 13-digit ISBN';
            },
            format: value => value.replace(/[-\s]/g, '')
        });

        if (!isbnResponse.isbn) {
            console.log('Cancelled.');
            return;
        }

        isbn = isbnResponse.isbn;
    }

    // Step 2: Fetch book data
    console.log('\nSearching for book...');
    let bookData = await fetchBookData(isbn);

    if (!bookData) {
        // No API found the book - offer manual entry
        console.warn('\nCould not find book data from any API source.');
        console.warn('Google Books quota may be exhausted, or the book is not in Open Library.');
        
        // Check if manual title/author provided via CLI
        if (cliArgs.title) {
            bookData = {
                title: cliArgs.title,
                authors: cliArgs.author || 'Unknown',
                coverUrl: null,
                bookId: null,
                isbn13: isbn
            };
            console.log(`Using manually provided title: "${bookData.title}"`);
        } else if (nonInteractive) {
            console.error('Book not found. Provide --title and --author for manual entry.');
            process.exit(1);
        } else {
            const manualEntry = await prompts({
                type: 'confirm',
                name: 'manual',
                message: 'Would you like to enter book details manually?',
                initial: false
            });

            if (!manualEntry.manual) {
                console.log('Cancelled.');
                return;
            }

            // Collect manual book details
            const titleResponse = await prompts({
                type: 'text',
                name: 'title',
                message: 'Book title:',
                validate: value => value.trim() ? true : 'Title is required'
            });

            const authorResponse = await prompts({
                type: 'text',
                name: 'author',
                message: 'Author(s):',
                initial: 'Unknown'
            });

            bookData = {
                title: titleResponse.title.trim(),
                authors: authorResponse.author.trim() || 'Unknown',
                coverUrl: null,
                bookId: null,
                isbn13: isbn
            };
        }
    }

    // Step 3: Confirm book details
    console.log('\nFound book:');
    console.log(`  Title: ${bookData.title}`);
    console.log(`  Author(s): ${bookData.authors}`);
    console.log(`  Cover: ${bookData.coverUrl || 'Not available'}`);

    if (!nonInteractive) {
        const confirmResponse = await prompts({
            type: 'confirm',
            name: 'confirm',
            message: 'Is this the correct book?',
            initial: true
        });

        if (!confirmResponse.confirm) {
            console.log('Cancelled.');
            return;
        }
    }

    // Step 4: Get rating
    let rating;
    if (nonInteractive && cliArgs.rating !== null) {
        rating = cliArgs.rating;
        if (rating < 1 || rating > 5 || ([0, 0.5].indexOf(rating % 1) === -1 && rating % 1 !== 0)) {
            console.error('Error: Invalid rating. Must be 1-5 in whole or half stars.');
            process.exit(1);
        }
        console.log(`Rating: ${rating}`);
    } else {
        const ratingResponse = await prompts({
            type: 'text',
            name: 'rating',
            message: 'Rating (1-5, half stars allowed, e.g., 3.5):',
            validate: value => {
                const num = parseFloat(value);
                if (isNaN(num)) return 'Please enter a valid number';
                if (num < 1 || num > 5) return 'Rating must be between 1 and 5';
                const decimal = num % 1;
                if (decimal !== 0 && decimal !== 0.5) {
                    return 'Rating must be whole or half stars (e.g., 3, 3.5, 4)';
                }
                return true;
            },
            format: value => parseFloat(value)
        });

        if (ratingResponse.rating === undefined) {
            console.log('Cancelled.');
            return;
        }
        rating = ratingResponse.rating;
    }

    // Step 5: Get year read
    const currentYear = new Date().getFullYear();
    let year;
    if (nonInteractive && cliArgs.year !== null) {
        year = cliArgs.year;
        if (year < 1900 || year > currentYear + 1) {
            console.error('Error: Invalid year.');
            process.exit(1);
        }
        console.log(`Year: ${year}`);
    } else {
        const yearResponse = await prompts({
            type: 'number',
            name: 'year',
            message: 'Year you read this book:',
            initial: currentYear,
            validate: value => {
                if (value < 1900 || value > currentYear + 1) {
                    return 'Please enter a valid year';
                }
                return true;
            }
        });

        if (yearResponse.year === undefined) {
            console.log('Cancelled.');
            return;
        }
        year = yearResponse.year;
    }

    // Step 6: Get favorite status
    let favorite;
    if (nonInteractive) {
        favorite = cliArgs.favorite;
        console.log(`Favorite: ${favorite}`);
    } else {
        const favoriteResponse = await prompts({
            type: 'confirm',
            name: 'favorite',
            message: 'Mark as favorite?',
            initial: false
        });

        if (favoriteResponse.favorite === undefined) {
            console.log('Cancelled.');
            return;
        }
        favorite = favoriteResponse.favorite;
    }

    // Step 7: Generate slug
    const slug = generateSlug(bookData.title);
    console.log(`\nGenerated slug: ${slug}`);

    // Load existing books to check for duplicates
    const booksData = await loadBooks();

    if (bookExists(booksData.books, parseInt(isbn), slug)) {
        console.error('Error: A book with this ISBN or slug already exists!');
        process.exit(1);
    }

    // Step 8: Download and process cover image
    console.log('\nDownloading and processing cover image...');
    await downloadAndProcessCover(bookData.coverUrl, slug, bookData.bookId, isbn);

    // Step 9: Create book object and add to books.json
    const newBook = {
        title: bookData.title,
        author: bookData.authors,
        year: year,
        rating: rating,
        type: 'book',
        link: `https://bookshop.org/book/${isbn}`,
        slug: slug,
        isbn_13: parseInt(isbn),
        favorite: favorite
    };

    // Add to the beginning of the array (newest first)
    booksData.books.unshift(newBook);

    // Save books.json
    await saveBooks(booksData);

    console.log('\n✓ Book added successfully!');
    console.log(`  Title: ${newBook.title}`);
    console.log(`  Author: ${newBook.author}`);
    console.log(`  Slug: ${newBook.slug}`);
    console.log(`  Rating: ${newBook.rating} stars`);
    console.log(`  Year: ${newBook.year}`);
    console.log(`  Favorite: ${newBook.favorite}`);
}

// Run the script
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
