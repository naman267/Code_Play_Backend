const multer = require('multer')
const post = require('../app/controllers/post/post')
const user = require('../app/controllers/user/user')
const auth = require('../app/controllers/auth/auth')
const authMiddleware = require('../app/controllers/middleware/auth')
const axios=require('axios')
const cors=require('cors')
const upload = multer()
const request=require('request')
/*const mid=(req,res,next)=>{
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Origin", 'http://192.168.1.7:5000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
      
      return res.status(200).json({})
    }
    console.log('CORS middleware')
    res.header("Access-Control-Allow-Origin", "http://192.168.1.7:5000");
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
   //res.header("Access-Control-Allow-Origin", '*');
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    console.log('res-',res)
    res.header('Cross-Origin-Resource-Policy', 'cross-origin')
  
   
    // console.log('req:::', req.headers)
    // console.log('res:::', res)
    next()
}*/
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
  app.get('/searching/problems',async (req,res)=>{

    const url="https://codeforces.com/api/problemset.problems?tags=binary search&sortings"
     
    try {
      const ress=await axios.get(url);
      const data=ress.data.result.problems;
      console.log(data)
      var finaldata=data.filter(dat=>{
        return ((dat.rating>=1000) && (dat.rating<=1400)) 
      })
      finaldata=finaldata.slice(0,10);
      console.log(finaldata)
       res.json(finaldata);


  }
  catch(e) {
    console.log("erroro--",e);

  }
})
app.get('/dfs/problems',async (req,res)=>{

  const url="https://codeforces.com/api/problemset.problems?tags=dfs and similar"
   
  try {
    const ress=await axios.get(url);
    const data=ress.data.result.problems;
    console.log(data)
    var finaldata=data.filter(dat=>{
      return ((dat.rating>=1000) && (dat.rating<=1400)) 
    })
    finaldata=finaldata.slice(0,12);
    console.log(finaldata)
     res.json(finaldata);


}
catch(e) {
  console.log("erroro--",e);

}
})
  app.post('/api/execute',upload.none(), (req, res) => {
    console.log("api----execute")
    const url = 'https://api.jdoodle.com/v1/execute'
    console.log('req body-',req.body)
    
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
             console.log(response)      
          return res.send(response.data)
        })
        .catch((e) => {
          //console.log("api-execute-",e)
          
        })
      // res.set('Content-Type', 'image/png')
    } catch (e) {
      res.status(404).send(e)
    }
  })
}

module.exports = initroutes
