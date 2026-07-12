const musicModel = require("../models/music.model");
const jwt=require("jsonwebtoken")

async function createMusic(req,res){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unautorized"})
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role!=='artist'){
            res.status(403).json({message:"you don't have access to create music"})
        }

    } catch (error) {

        res.status(401).json({message:"Unautorized!"})

    }
}