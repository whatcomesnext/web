var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  votes: Number
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;