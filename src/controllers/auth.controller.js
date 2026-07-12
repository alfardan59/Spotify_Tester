const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")

async function registerUser(req,res){

    const {username,email,password,role="user"}=req.body;

    const isUserAlreadyExists=await userModel.findOne({
        //check for either two exists or not
        $or:[
            {username},
            {email}
        ]
    }) 

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User or Email already exits"
        })
    }

    const hashPassword=await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hashPassword,
        role
    })

    const token=jwt.sign({
        id:user._id,
        role:user.role,
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    })

}

module.exports = {registerUser};