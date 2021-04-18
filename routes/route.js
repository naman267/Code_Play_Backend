const multer = require('multer')
const post = require('../app/controllers/post/post')
const user = require('../app/controllers/user/user')
const auth = require('../app/controllers/auth/auth')
const authMiddleware = require('../app/controllers/middleware/auth')
const axios=require('axios')
const cors=require('cors')
const upload = multer()
const request=require('request')
const nodemailer = require('nodemailer');
const { compareSync } = require('bcryptjs')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.user,
    pass: process.env.pass
  }
});

var mailOptions = {
  from: 'codeplay267@gmail.com',
  to: 'codeplay267@gmail.com',
  subject: 'Feedback',
  text: `hello i hope you are fine`
};


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
app.get('/dp/problems',async (req,res)=>{

  const url="https://codeforces.com/api/problemset.problems?tags=dp"
   
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
  }),
  app.post('/send',(req,res)=>{
    console.log(req.body)
    mailOptions.text=`FEEDBACK From ${req.body.email}-${req.body.message}`
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        return res.json({message:"fail"})
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    mailOptions.to=req.body.email;
    mailOptions.subject='Thanks For Feedback'
    mailOptions.text=`Thanks for Your feedback-${req.body.message} `
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        return res.json({message:"fail"})
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return res.json({message:"success"})
  })

}

module.exports = initroutes
