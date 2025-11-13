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
 * Fetch book data from Google Books API
 */
async function fetchBookData(isbn) {
    const url = `${GOOGLE_BOOKS_API}?q=isbn:${isbn}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return null;
        }

        const book = data.items[0].volumeInfo;

        return {
            title: book.title,
            authors: book.authors ? book.authors.join(', ') : 'Unknown',
            coverUrl: book.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
            isbn13: isbn
        };
    } catch (error) {
        console.error('Error fetching book data:', error.message);
        return null;
    }
}

/**
 * Download and process cover image
 */
async function downloadAndProcessCover(coverUrl, slug) {
    if (!coverUrl) {
        console.warn('No cover image URL provided, skipping image download');
        return false;
    }

    try {
        // Download the image
        const response = await fetch(coverUrl);
        if (!response.ok) {
            throw new Error(`Failed to download image: ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();

        // Ensure the book covers directory exists
        await fs.mkdir(BOOK_COVERS_DIR, { recursive: true });

        // Generate three sizes: 160, 320, 640 pixels wide
        const sizes = [160, 320, 640];

        for (const size of sizes) {
            const outputPath = path.join(BOOK_COVERS_DIR, `${slug}@${size}.webp`);

            await sharp(Buffer.from(buffer))
                .resize(size, null, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .webp({ quality: 85 })
                .toFile(outputPath);

            console.log(`Created ${slug}@${size}.webp`);
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
 * Main function
 */
async function main() {
    console.log('=== Add Book to Collection ===\n');

    // Step 1: Prompt for ISBN
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

    const isbn = isbnResponse.isbn;

    // Step 2: Fetch book data
    console.log('\nSearching for book...');
    const bookData = await fetchBookData(isbn);

    if (!bookData) {
        console.error('Book not found. Please check the ISBN and try again.');
        return;
    }

    // Step 3: Confirm book details
    console.log('\nFound book:');
    console.log(`  Title: ${bookData.title}`);
    console.log(`  Author(s): ${bookData.authors}`);
    console.log(`  Cover: ${bookData.coverUrl || 'Not available'}`);

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

    // Step 4: Prompt for rating
    const ratingResponse = await prompts({
        type: 'number',
        name: 'rating',
        message: 'Rating (1-5, half stars allowed, e.g., 3.5):',
        min: 1,
        max: 5,
        validate: value => {
            if (value < 1 || value > 5) return 'Rating must be between 1 and 5';
            // Check if it's a valid increment (whole or half)
            const decimal = value % 1;
            if (decimal !== 0 && decimal !== 0.5) {
                return 'Rating must be whole or half stars (e.g., 3, 3.5, 4)';
            }
            return true;
        }
    });

    if (ratingResponse.rating === undefined) {
        console.log('Cancelled.');
        return;
    }

    // Step 5: Prompt for year read
    const currentYear = new Date().getFullYear();
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

    // Step 6: Prompt for favorite status
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

    // Step 7: Generate slug
    const slug = generateSlug(bookData.title);
    console.log(`\nGenerated slug: ${slug}`);

    // Load existing books to check for duplicates
    const booksData = await loadBooks();

    if (bookExists(booksData.books, parseInt(isbn), slug)) {
        console.error('Error: A book with this ISBN or slug already exists!');
        return;
    }

    // Step 8: Download and process cover image
    console.log('\nDownloading and processing cover image...');
    await downloadAndProcessCover(bookData.coverUrl, slug);

    // Step 9: Create book object and add to books.json
    const newBook = {
        title: bookData.title,
        author: bookData.authors,
        year: yearResponse.year,
        rating: ratingResponse.rating,
        type: 'book',
        link: `https://bookshop.org/book/${isbn}`,
        slug: slug,
        isbn_13: parseInt(isbn),
        favorite: favoriteResponse.favorite
    };

    // Add to the beginning of the array (newest first)
    booksData.books.unshift(newBook);

    // Save books.json
    await saveBooks(booksData);

    console.log('\n✓ Book added successfully!');
    console.log(`  Title: ${newBook.title}`);
    console.log(`  Slug: ${newBook.slug}`);
    console.log(`  Rating: ${newBook.rating} stars`);
}

// Run the script
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
