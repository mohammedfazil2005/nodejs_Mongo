const jwt=require('jsonwebtoken')

const authentication=(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(' ')[1]
        const verifyToken=jwt.verify(token,'fazil2005')
        if(!verifyToken){
            res.status(401).json("Invalid token")
        }
        req.userID=verifyToken._id
        next()
    } catch (error) {
        res.status(500).json('Please authenticate')
    }
}

module.exports=authentication