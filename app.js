const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");

const app = express();

mongoose.set('strictQuery', false);

console.log("connecting to", config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.error("error connecting to MongoDB", error);
  });

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);


module.exports = app;
