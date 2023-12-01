const jwt = require("jsonwebtoken") // allten

exports.SCRERTCODE = async(req,res,next) => {
    try {
        const token = req.header("Secrettoken")
        if(!token){
            return res.send("No SecretCode!")
        }
        const decoded = jwt.verify(token, process.env.UNKNOW_SCRERTCODE)
        req.user = decoded.user
        
        next();

    }catch (err){
        console.log("SecretCode Invalid")
        res.send('SecretCode Invalid')
    }
}