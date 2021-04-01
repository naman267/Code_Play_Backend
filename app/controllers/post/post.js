const Post = require('../../models/post')
function post() {
  return {
    async upvotee(req, res) {
      const postId = req.params.id
      const votedBy = req.user.email
      const post = await Post.findById(postId)

      const idx = post.upvotedBy.findIndex((user) => user === votedBy)
      if (idx === -1) {
        post.upvotedBy.push(votedBy)
        const idx1 = post.downvotedBy.findIndex((user) => user === votedBy)
        post.upvote = post.upvote + 1
        if (idx1 === -1) {
          post.totalvotes = post.totalvotes + 1
        } else {
          post.downvotedBy.splice(idx1, 1)
          post.downvote = post.downvote - 1
        }
      }

      post.userExisted = idx !== -1
      post.save()
      res.json(post)
    },
    /*async upvotee(req, res) {
      const postId = req.params.id

      const post = await Post.findById(postId)
      post.upvote = post.upvote + 1
      post.totalvotes = post.totalvotes + 1

      post.save()
      console.log(post)
      res.json(post)

    },*/
    async downvotee(req, res) {
      const postId = req.params.id
      const votedBy = req.user.email
      const post = await Post.findById(postId)

      const idx = post.downvotedBy.findIndex((user) => user === votedBy)
      if (idx === -1) {
        post.downvotedBy.push(votedBy)
        const idx1 = post.upvotedBy.findIndex((user) => user === votedBy)
        post.downvote = post.downvote + 1
        if (idx1 === -1) {
          post.totalvotes = post.totalvotes + 1
        } else {
          post.upvotedBy.splice(idx1, 1)
          post.upvote = post.upvote - 1
        }
      }
      post.userExisted = idx !== -1
      post.save()
      res.json(post)
    },
    /*async downvotee(req, res) {
      const postId = req.params.id

      const post = await Post.findById(postId)
      post.downvote = post.downvote + 1
      post.totalvotes = post.totalvotes + 1

      post.save()
      console.log(post)
      res.json(post)
    },*/
    makepost(req, res) {
      console.log('request accepted')
      const title = req.body.newPostTitle
      const body = req.body.newPostContent
      console.log('makePost-----', req.user)
      const post = new Post({
        title,
        body,
        writtenBy: req.user.email,
        upvote: 0,
        downvote: 0,
        totalvotes: 0
      })
      post.save()
      res.json(post)
    },
    /*makepost(req, res) {
      console.log(req.body)
      const { newPostTitle, newPostContent } = req.body
      const newpost = new Post({
        title: newPostTitle,
        body: newPostContent,
        writtenBy: "rachit"
      })
      newpost.save()

      res.json(newpost)
    },*/
    async getposts(req, res) {
      const allpost = await Post.find({})
      res.json(allpost)
    },
    async getpostsTitle(req, res) {
      const title = req.params.title
      const allpost = await Post.find({ title: title })
      console.log(allpost)
      res.json(allpost)
    }
  }
}

module.exports = post
