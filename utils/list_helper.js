const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
  };

  return blogs.map(blog => blog.likes).reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (prev, current) => {
    return (prev.likes > current.likes) ? prev : current;
  };

  return blogs.reduce(reducer, {});
};

const mostBlogs = (blogs) => {
  const reducer = (prev, current) => {
    return (prev.blogs > current.blogs) ? prev : current;
  };

  const mapper = (val, key) => {
    return { author: key, blogs: val };
  };

  return _.map(_.countBy(blogs, "author"), mapper).reduce(reducer, {});
};

const mostLikes = (blogs) => {
  const reducer = (prev, current) => {
    return (prev.likes > current.likes) ? prev : current;
  };

  const mapper = (val, key) => {
    return { author: key, likes: _.sumBy(val, "likes") };
  };

  return _.map(_.groupBy(blogs, "author"), mapper).reduce(reducer, {});
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
