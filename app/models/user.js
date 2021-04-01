const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
})

const User = mongoose.model('User', postSchema)

module.exports = User
