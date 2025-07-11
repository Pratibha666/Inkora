import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoose connected successfully")
    } catch (error) {
        console.log("error while connecting with mongoose")
    }
}

export default connectDB