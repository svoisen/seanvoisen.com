#!/bin/bash

# Generate favicon files from source PNG
# Usage: ./scripts/generate-favicons.sh

set -e

cd "$(dirname "$0")/../src"

SOURCE="favicon.png"

if [ ! -f "$SOURCE" ]; then
    echo "Error: $SOURCE not found in src directory"
    exit 1
fi

echo "Generating favicon files from $SOURCE..."

# Generate different sizes
magick "$SOURCE" -resize 16x16 favicon-16x16.png
echo "✓ Created favicon-16x16.png"

magick "$SOURCE" -resize 32x32 favicon-32x32.png
echo "✓ Created favicon-32x32.png"

magick "$SOURCE" -resize 180x180 apple-touch-icon.png
echo "✓ Created apple-touch-icon.png"

magick "$SOURCE" -define icon:auto-resize=16,32,48 favicon.ico
echo "✓ Created favicon.ico"

echo "All favicon files generated successfully!"
