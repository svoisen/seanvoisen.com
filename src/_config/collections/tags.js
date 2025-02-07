export const tags = (collection) => {
  let tagSet = new Set();

  collection
    .getAllSorted()
    .forEach(function (item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        if (typeof tags === "string") {
          tags = [tags];
        }

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

  return [...tagSet].sort();
};
