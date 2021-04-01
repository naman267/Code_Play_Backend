const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const initroutes = require('../routes/route')

const port = process.env.PORT || 3080
const app = express()

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

const cors = require('cors');

var corsOptions = {
  origin: 'https://codeplaynr.netlify.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use((req, res, next) => {
  console.log('CORS middleware')
  /*res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )*/
  res.header("Access-Control-Allow-Origin", 'https://codeplaynr.netlify.app');
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  //res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
    return res.status(200).json({})
  }
  // console.log('req:::', req.headers)
  // console.log('res:::', res)
  next()
})
//--------------------MONGOOSE-------------------
mongoose.connect(
  'mongodb+srv://pizza:pizza@cluster0.jg2br.mongodb.net/codeplay',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
)

const connection = mongoose.connection

connection.once('open', () => {
  console.log('Established')
})
//-------------------------------------------------
app.get('/', (req, res) => {
  res.send('App works!!!')
})

app.post('/api/execute',cors(corsOptions), (req, res) => {
  console.log("api----execute")
  const url = 'https://api.jdoodle.com/v1/execute'
  
 /* let program=JSON.parse(req.query.program)
  console.log(JSON.parse(req.query.program).script)*/
  //00000000000return res.json({message:"message"})
  console.log(req.get('origin'))
  res.setHeader("Access-Control-Allow-Origin", req.get('origin'));
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

initroutes(app)

app.listen(port, () => {
  console.log(`CORS-enabled web server listening on port ${port}`)
})
