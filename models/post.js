const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postNum:{
    type: Number,
    requirde: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postSchema);