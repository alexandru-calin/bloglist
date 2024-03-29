const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const listWithNoBlogs = [];
const listWithOneBlog = [
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 24,
    __v: 0
  }
];
const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 24,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];


test("dummy returns one", () => {
  assert.strictEqual(listHelper.dummy(listWithNoBlogs), 1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.totalLikes(listWithNoBlogs), 0);
  });

  test("when list has only one blog equals the likes of that", () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 24);
  });

  test("of a bigger list is calculated right", () => {
    assert.strictEqual(listHelper.totalLikes(listWithManyBlogs), 60);
  });
});

describe("blog with most likes", () => {
  test("of an empty list is an empty object", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithNoBlogs), {});
  });

  test("when list has only one blog equals that blog", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 24,
      __v: 0
    });
  });

  test("of a bigger list is the right one", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithManyBlogs), {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 24,
      __v: 0
    });
  });
});

describe("author with most blogs", () => {
  test("of an empty list is an empty object", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithNoBlogs), {});
  });

  test("when list has only one blog equals that author", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
      author: "Robert C. Martin",
      blogs: 1,
    });
  });

  test("of a bigger list is the right one", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithManyBlogs), {
      author: "Robert C. Martin",
      blogs: 3
    });
  });
});

describe("author with most likes", () => {
  test("of an empty list is an empty object", () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithNoBlogs), {});
  });

  test("when list has only one blog equals that author", () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), {
      author: "Robert C. Martin",
      likes: 24
    });
  });

  test("of a bigger list is the right one", () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithManyBlogs), {
      author: "Robert C. Martin",
      likes: 36
    });
  });
});
