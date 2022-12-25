const jwt=require('jsonwebtoken')
function token()
{
    return {
        getToken(id){
            //Generate token from userid
            var Keyword;
            if(process.env.JWT_KEYWORD)
            {
                Keyword = process.env.JWT_KEYWORD
            }
            else
            {
                Keyword ="CODEPLAY"
            }
            const token=jwt.sign({_id:id},Keyword)
            console.log(token)
            //await user.save()
            return token
    
        }
    }
}

module.exports=token