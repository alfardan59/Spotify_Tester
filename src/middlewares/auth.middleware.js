const jwt=require("jsonwebtoken")

async function authArtist(req,res,next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unautorized"})
    }

    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role!=="artist"){
            return res.status(403).json({message:"You don't have access"})
        }
        req.user=decoded;

        next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({message:"Unautorized"})
    }
}

async function authUser(req,res,next){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unautorized"})
    }

    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role!=='user' && decoded.role!=="artist"){
            return res.status(403).json({message:"You don't have access"})
        }

        req.user=decoded;

        next()

    } catch (error) {
        console.error(error)
        return res.status(401).json({message:"Unautorized"})
    }
}

module.exports={authArtist, authUser}