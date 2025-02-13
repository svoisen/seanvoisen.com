export const navigationItems = (directoryData) => {
  return directoryData.filter(item => item.inNavigation)
}

export const directoryItems = (directoryData) => {
  return directoryData
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
