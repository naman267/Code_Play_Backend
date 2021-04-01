const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  writtenBy: { type: String, required: true },
  upvote: { type: Number, default: 0 },
  totalvotes: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
  upvotedBy: { type: [String], default: null },
  downvotedBy: { type: [String], default: null },
  userExisted: { type: String, default: false }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
