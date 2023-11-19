const jwt = require("jsonwebtoken") // allten

exports.auth = async(req,res,next) => {
    try {
        const token = req.header("authtoken")
        if(!token){
            return res.send("No token!")
        }
        const decoded = jwt.verify(token, "lovenicky")
        req.user = decoded.user
        
        next();

    }catch (err){
        console.log("Token Invalid")
        res.send('Token Invalid')
    }
}