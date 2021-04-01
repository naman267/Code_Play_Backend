const User = require('../../models/user')
const token = require('../jwtToken/jwttoken')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

function authentication() {
  return {
    async createuser(req, res) {
      const name = req.body.name
      const email = req.body.email
      let password = req.body.password
      password = await bcrypt.hash(password, 8)
      const existUser = await User.findOne({ email: email })
      console.log(existUser)
      if (!existUser) {
        console.log('hashed Password', password)
        const user = new User({
          name: name,
          email: email,
          password: password
        })
        const newtoken = token().getToken(user._id)
        user.tokens = user.tokens.concat({ token: newtoken })
        user.save()

        console.log(user)
        console.log("createUser-",newtoken)
        res.json({ message: 'userCreated', token: newtoken })
      } else {
        res.json({ message: 'Email already registered' })
      }
    },
    async login(req, res) {
      try {
        //const logintoken=req.header('Authorization').replace('Bearer ','')
        //console.log(logintoken)
        //const decoded=jwt.verify(logintoken,"CODEPLAY")
        //console.log(decoded)
        //const user=await User.findOne({_id:decoded._id,'tokens.token':token})
        console.log('req.body:::', req.body)
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({ email: email })
          
        if (!user) {
          res.json({ message: 'Invalid Email' })
        } else {
          const ismatch = await bcrypt.compare(password, user.password)
          if (!ismatch) {
            console.log('Invalid Credentials')
          } else {
            const logintoken = token().getToken(user._id)
            user.tokens = user.tokens.concat({ token: logintoken })
            user.save()
            console.log(user)
            res.json({
              message: 'Login succesful',
              name: user.name,
              token: logintoken
            })
          }
        }
      } catch (e) {
        res.json({ message: 'Unable to login' })
      }
    },
    async logout(req, res) {
      try {
        // /req.user.tokens=req.user.tokens.filter((token)=>{
        // return token.token!==req.token
        // })
        req.user.tokens = []
        await req.user.save()
        console.log(req.user)
        res.send()
      } catch (e) {
        res.status(500).send()
      }
    }
  }
}
module.exports = authentication
