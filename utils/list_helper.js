const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
  };

  return blogs.map(blog => blog.likes).reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes
};
