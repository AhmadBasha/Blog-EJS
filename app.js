//jshint esversion:6
// https://lodash.com

// $ npm i -g npm
// $ npm i --save lodash

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// Load the full build.
const _ = require('lodash');

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true
});



const compuseSchema = {
  title: String,
  content: String
};


// collection
const Post = mongoose.model("Post", compuseSchema);


const homeStartingContent = "Hello this is my home screen of the bloog.";
const aboutContent = "I am Ahmed Altowairqi";
const contactContent = "you can contact me one of my personal pages on the social media";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));



app.get("/", function(req, res) {

  Post.find({}, function(err, posts) {
    res.render("home", {
      homeContent: homeStartingContent,
      posts: posts

    });

  });


});

app.get("/about", function(req, res) {
  res.render("about", {
    about: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contact: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err) {
    if (!err) {
      res.redirect("/");

    }
  });
});





app.get("/posts/:postId", function (req, res){

  // const requestedId = _.lowerCase(req.params.postId);

  const requestedId =  req.params.postId;

  // console.log("postid is:", '"' + req.params.postId + '"');

  Post.findById(requestedId, function(err, post){

    console.log(post)
      res.render("post", {
        title: post.title,
        content: post.content
      });

  });

});



  // console.log(req.params.topic);





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
