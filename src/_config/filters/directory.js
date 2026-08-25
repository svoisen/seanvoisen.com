export const navigationItems = (directoryData) => {
  return directoryData.filter(item => item.inNavigation)
}

// The directory is the site's own sitemap, so an item is listed unless it
// opts out with `inDirectory: false`. It has nothing to do with `inNavigation`
// — a page can be reachable from the header, the directory, both, or neither.
export const directoryItems = (directoryData) => {
  return directoryData
    .filter(item => item.inDirectory !== false)
    .filter(item => item.title.toLowerCase() != "directory")
    .sort((a, b) => a.title.localeCompare(b.title))
}

export const getDescription = (directoryData, url) => {
  const item = directoryData.find(item => item.url === url);
  if (item) {
    return item.description;
  }

  return "";
}
