const multer = require('multer')
const post = require('../app/controllers/post/post')
const user = require('../app/controllers/user/user')
const auth = require('../app/controllers/auth/auth')
const authMiddleware = require('../app/controllers/middleware/auth')
const axios=require('axios')
const cors=require('cors')
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
  app.post('/compiler',cors(),(req,res)=>{
    console.log("reqbody--",req.body)
    axios.post('/api/execute',req.body,{
      headers:{ 'content-type': 'application/json'}
    }).then(result=>{
      console.log(result)
    }).catch(e=>{
      console.log('compiler-',e)
    })
  })
  app.post('/api/execute', (req, res) => {
    console.log("api----execute")
    const url = 'https://api.jdoodle.com/v1/execute'
  
    console.log(req.get('origin'))
    //res.setHeader("Access-Control-Allow-Origin", req.get('origin'));
    try {
      axios
        .post(url, req.body, {
          headers: {
            'content-type': 'application/json'
          }
        })
        .then((response) => {
          console.log("api--",response.data)
          
          return res.send(response.data)
        })
        .catch((e) => {
          console.log("api-execute-",e)
          
        })
      // res.set('Content-Type', 'image/png')
    } catch (e) {
      res.status(404).send(e)
    }
  })
}

module.exports = initroutes
