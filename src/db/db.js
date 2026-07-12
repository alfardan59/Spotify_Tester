const mongoose=require("mongoose");

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected Successfully!")
    } catch (error) {
        console.error("Database connection error:",error)
        process.exit();
    }
}

module.exports=connectDB;