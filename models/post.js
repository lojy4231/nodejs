const mongoose = require("mongoose");
let moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const postSchema = new mongoose.Schema({
  postNum: {
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
    default: moment().format("YYYY-MM-DD hh:mm:ss")
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postSchema);