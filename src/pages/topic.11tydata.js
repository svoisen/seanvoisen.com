// The count of a topic's posts, beside its intro in the margin (see page.njk).
export default {
  eleventyComputed: {
    listFacts: (data) => {
      const count = (data.collections[data.tag] || []).length;
      return [{ label: "Posts", value: `${count} ${count === 1 ? "post" : "posts"}` }];
    }
  }
};
