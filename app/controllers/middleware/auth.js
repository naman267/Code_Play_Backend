const jwt = require('jsonwebtoken')
const User = require('../../models/user')

const auth = async (req, res, next) => {
  try {
    console.log('middleware')
    console.log('entered in logout server')
    console.log(req.header)
    const token = req.header('Authorization').replace('Bearer ', '')
    console.log('Got logout token--', token)
    var Keyword;
    if(process.env.JWT_KEYWORD)
    {
        Keyword = process.env.JWT_KEYWORD
    }
    else
    {
        Keyword ="CODEPLAY"
    }
    const decoded = jwt.verify(token,Keyword)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    console.log("user",user)
    if (!user) {
      throw new Error()
    }
    req.token = token
    req.user = user
    next()
  } catch (e) {
    console.log("catch-",e)
    res.status(401).send({ error: 'Please Authenticate' })
  }
}
module.exports = auth
