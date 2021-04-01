const multer = require('multer')
const post = require('../app/controllers/post/post')
const user = require('../app/controllers/user/user')
const auth = require('../app/controllers/auth/auth')
const authMiddleware = require('../app/controllers/middleware/auth')

const upload = multer()

function initroutes(app) {
  app.post('/signup',upload.none(), auth().createuser)
  app.post('/login', upload.none(), auth().login)
  app.post('/logout', authMiddleware, auth().logout)
  app.post('/makepost', authMiddleware, upload.none(), post().makepost)
  app.get('/getposts', post().getposts)
  app.get('/getposts/:title', post().getpostsTitle)
  app.post('/upvote/:id', authMiddleware, post().upvotee)
  app.post('/downvote/:id', authMiddleware, post().downvotee)
  app.get('/getUser', authMiddleware,user().getUser)
}

module.exports = initroutes
