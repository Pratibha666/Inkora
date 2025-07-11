import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    forgot_password_otp:{type:String, default:""},
    forgot_password_expiry:{type:Date,default:""},
    role:{type:String, enum:["ADMIN","USER"], default:"USER"}
},{timestamps:true})


export default mongoose.model("User",userSchema)