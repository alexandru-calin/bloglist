const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 24,
  },
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("correct number of blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("blog has id property", async () => {
  const response = await api.get("/api/blogs");
  for (const blog of response.body) {
    assert(blog.hasOwnProperty("id"));
  }
});

test("a new blog is saved correctly", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "Fullstackopen",
    url: "https://fullstackopen.com/en/part4/testing_the_backend",
    likes: 100,
  }
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const titles = response.body.map(blog => blog.title);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);
  assert(titles.includes("async/await simplifies making async calls"));
});

after(async () => {
  await mongoose.connection.close();
});
