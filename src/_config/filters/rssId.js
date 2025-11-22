import crypto from 'crypto';

/**
 * Generate RSS/Atom feed IDs with stable legacy support
 *
 * For posts published before 2025-11-21:
 *   - Uses URL-based IDs with legacy paths (/blog, /stream)
 *   - Preserves existing feed reader state
 *
 * For posts published on or after 2025-11-21:
 *   - Uses tag URI scheme for permanent unique IDs
 *   - Format: tag:seanvoisen.com,YYYY-MM-DD:MD5_HASH
 *   - Hash is based on title + date for uniqueness
 *
 * @param {Object} post - The post object from Eleventy collection
 * @param {string} baseUrl - The site base URL (e.g., "https://seanvoisen.com")
 * @returns {string} - The unique feed entry ID
 */
export const genRSSId = (post, baseUrl) => {
  const cutoffDate = new Date('2025-11-21');
  const postDate = new Date(post.date);

  // For posts before the cutoff date, use legacy URL-based IDs
  if (postDate < cutoffDate) {
    // Determine if this is a writing or thinking post based on filePathStem
    const pathStem = post.page.filePathStem;
    let legacyUrl = post.url;

    // Replace /writing/ with /blog/ and /thinking/ with /stream/
    if (pathStem.includes('/writing/')) {
      legacyUrl = post.url.replace('/writing/', '/blog/');
    } else if (pathStem.includes('/thinking/')) {
      legacyUrl = post.url.replace('/thinking/', '/stream/');
    }

    // Return absolute URL with legacy path
    return `${baseUrl}${legacyUrl}`;
  }

  // For new posts, generate tag URI with MD5 hash
  const dateStr = postDate.toISOString().split('T')[0]; // YYYY-MM-DD format
  const hashInput = `${post.data.title}${post.date}`;
  const hash = crypto.createHash('md5').update(hashInput).digest('hex');

  return `tag:seanvoisen.com,${dateStr}:${hash}`;
};
