export const stars = (rating) => {
  const wholeStars = Math.floor(rating);
  const halfStar = rating - wholeStars > 0 ? true : false;
  let output = "";

  for (let i = 0; i < wholeStars; i++) {
    output += '⭑';
  }

  if (halfStar) {
    output += '½';
  }

  return output;
};
