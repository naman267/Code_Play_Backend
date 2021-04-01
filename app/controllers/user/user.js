const User = require('../../models/user')
const jwt=require('jsonwebtoken')
function user() {
  return {
    async getUser(req, res) {
     
        console.log(req.user.email)
       return res.json({user:req.user.email})
        /*console.log("GretUser")
        const token = req.header('Authorization').replace('Bearer', '')
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_KEYWORD)
        const user = await User.findOne({
          _id: decoded._id,
          'tokens.token': token
        })
        console.log("user-",user)
        if (!user) {
          console.log("ifff")
          throw new Error()
        }
        res.json({ user: user.email })
      } catch (e) {
        console.log(e)
        res.status(401).send({ error: 'Please Authenticate' })
      }*/
    
  }
}
}

module.exports = user
