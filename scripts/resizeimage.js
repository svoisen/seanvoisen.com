#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

/**
 * Display usage information
 */
function showUsage() {
    console.log('Usage: npm run resizeimage <image-path> <width> [filetype]');
    console.log('');
    console.log('Arguments:');
    console.log('  image-path  Path to the image file to resize');
    console.log('  width       Target width in pixels (height will be calculated to preserve aspect ratio)');
    console.log('  filetype    Output file type: "jpeg" or "webp" (default: webp)');
    console.log('');
    console.log('Examples:');
    console.log('  npm run resizeimage ./photo.jpg 320');
    console.log('  npm run resizeimage ./photo.jpg 320 jpeg');
    console.log('  npm run resizeimage ./photo.jpg 320 webp');
    console.log('');
    console.log('Output:');
    console.log('  The resized image will be saved in the same directory with @<width> suffix.');
    console.log('  Example: photo.jpg -> photo@320.webp (default)');
    console.log('  Example: photo.jpg -> photo@320.jpg (with filetype=jpeg)');
}

/**
 * Main function
 */
async function main() {
    const args = process.argv.slice(2);

    // Validate arguments
    if (args.length < 2) {
        console.error('Error: Missing required arguments\n');
        showUsage();
        process.exit(1);
    }

    const imagePath = args[0];
    const width = parseInt(args[1], 10);
    const fileType = (args[2] || 'webp').toLowerCase();

    // Validate width
    if (isNaN(width) || width <= 0) {
        console.error('Error: Width must be a positive number\n');
        showUsage();
        process.exit(1);
    }

    // Validate file type
    if (fileType !== 'jpeg' && fileType !== 'webp') {
        console.error('Error: File type must be either "jpeg" or "webp"\n');
        showUsage();
        process.exit(1);
    }

    // Check if file exists
    try {
        await fs.access(imagePath);
    } catch (error) {
        console.error(`Error: File not found: ${imagePath}`);
        process.exit(1);
    }

    // Parse the file path
    const parsedPath = path.parse(imagePath);
    const outputExt = fileType === 'jpeg' ? '.jpg' : '.webp';
    const outputPath = path.join(
        parsedPath.dir,
        `${parsedPath.name}@${width}${outputExt}`
    );

    // Resize the image
    try {
        console.log(`Resizing ${imagePath} to width ${width}px as ${fileType.toUpperCase()}...`);

        const metadata = await sharp(imagePath).metadata();
        const originalWidth = metadata.width;
        const originalHeight = metadata.height;

        let pipeline = sharp(imagePath)
            .resize(width, null, {
                fit: 'inside',
                withoutEnlargement: true
            });

        // Apply format-specific options
        if (fileType === 'jpeg') {
            pipeline = pipeline.jpeg({ quality: 80 });
        } else {
            pipeline = pipeline.webp({ quality: 80 });
        }

        await pipeline.toFile(outputPath);

        // Get the output metadata to show the final dimensions
        const outputMetadata = await sharp(outputPath).metadata();

        console.log(`✓ Success!`);
        console.log(`  Original: ${originalWidth}x${originalHeight}px`);
        console.log(`  Resized:  ${outputMetadata.width}x${outputMetadata.height}px`);
        console.log(`  Format:   ${fileType.toUpperCase()}`);
        console.log(`  Saved to: ${outputPath}`);

    } catch (error) {
        console.error('Error resizing image:', error.message);
        process.exit(1);
    }
}

// Run the script
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
