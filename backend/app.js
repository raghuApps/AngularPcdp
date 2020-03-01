const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./models/post");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0-c3tkv.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("donnectopn error");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: "post added successfully"
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then(response => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: response
      });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = app;
