import userModel from "../models/userModel.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import generateOtp from "../utils/generateOtp.js";
import sendEmail from "../sendEmail/sendEmail.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
 
//register
export const register = async(req,res)=>{
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                message:"Provide all the fields",
                error:true,
                success:false,
            })
        }
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message:"User exists. Please login",
                error:true,
                success:false,
            })
        }
        if(password.length<6){
            return res.status(400).json({
                message:"Password length should be more than 5 characters",
                error:true,
                success:false,
            })
        }
        const hashPass = await bcryptjs.hash(password,16)

        const user = new userModel({
            name,
            email,
            password:hashPass,
        })
        const newUser = await user.save()
        if(newUser){
            return res.status(200).json({
                message:"Account created successfully",
                error:false,
                success:true,
            })
        }
        else {
            return res.status(400).json({
                message:"Something went wrong while creating account. Try again later",
                error:true,
                success:false,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error. Please try again later",
            error:error.message,
            success:false,
        })
    }
}

//login
export const login = async(req,res)=>{
    try {
        const {email, password, role} = req.body
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPass = process.env.ADMIN_PASS
        if(role === "ADMIN"){
        if (email === adminEmail && password === adminPass) {
            const token = jwt.sign(
                { role: "ADMIN" },
                process.env.SECRET_KEY,
                { expiresIn: "1h" } // 1hr expiry time
            );
            return res.status(200).json({
                role: "ADMIN",
                token,
                message: "Logged in as Admin",
                success: true,
            });
        }
        else{
            return res.status(400).json({
                message:"Invalid credentials",
                error:true,
                success:false,
            })
        }
    }
        if(!email || !password){
            return res.status(400).json({
                message:"Provide all the fields",
                error:true,
                success:false,
            })
        }
        const existingUser = await userModel.findOne({email})
        if(!existingUser){
            return res.status(400).json({
                message:"Invalid credentials",
                error:true,
                success:false,
            })
        }
        const isMatch = await bcryptjs.compare(password,existingUser.password)
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials",
                error:true,
                success:false,
            })
        }
        const authClaims = [
            {_id: existingUser._id},
            {email: existingUser.email},
            {role: existingUser.role},
        ]
        const token = jwt.sign(
            {authClaims},
            process.env.SECRET_KEY,
            {expiresIn:"1h"} //1 hr expiry time 
        )
        return res.status(200).json({
            id: existingUser._id,
            role: existingUser.role,
            token: token,
            message:"Logged in successfully",
            error:false,
            success:true,
        })

    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error. Please try again later",
            error:error.message,
            success:true,
        })
    }
}

//logout
export const logout = async(req,res)=>{
    try {
        return res.status(200).json({
            message:"Logged out successfully",
            error:false,
            success:true,
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error. Please try again later",
            error:error.message,
            success:false,
        })
    }
}

// update user details
export const updateUser = async(req,res)=>{
    try {
        const userId = req.user.authClaims[0]._id
        const {name,email, password} = req.body
        const user = await userModel.findById(useId)
        if(!user){
            return res.status(400).json({
                message:"User not found",
                error:true,
                success:false,
            })
        }
        if(name) user.name = name
        if(email) user.email = email
        if(password){
            const hashPass = await bcryptjs.hash(password,16)
            user.password = hashPass
        }
        const updatedUser = await user.save()
        if(updatedUser){
            return res.status(200).json({
                message:"User updated successfully",
                error:false,
                success:true,
                updatedUser,
            })
        }
        else {
            return res.status(400).json({
                message:"Something went wrong while updating user. Try again later",
                error:true,
                success:false,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error. Please try again later",
            error:error.message,
            success:false,
        })
    }
}

// forgot password
export const forgotPassword = async(req,res)=>{
    try {
        const {email} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"Email not available",
                error:true,
                success:false,
            })
        }
        const otp = generateOtp()
        const otpExpireTime = new Date(Date.now() + 5*60*1000)//5min
        const update = await userModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry:new Date(otpExpireTime).toISOString()
        })
        await sendEmail({
            to:email,
            subject:"Forgot Password from Inkora",
            html:forgotPasswordTemplate({
                name:user.name,
                otp:otp
            })
        })
        if(update){
            return res.status(200).json({
                message:"OTP sent successfully. Check your email",
                error:false,
                success:true,
            })
        }
        else{
            return res.status(400).json({
                message:"Couldn't update password. Try again later",
                error:true,
                success:false,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error. Please try again later",
            error:error.message,
            success:false,
        })
    }
}

// verify forgot password
export const verifyForgotPassword = async(req,res)=>{
    try {
        const {email,otp} = req.body
        if(!email || !otp){
            return res.status(400).json({
                message:"Provide all the fields",
                error:true,
                success:false,
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"Email not available",
                error:true,
                success:false,
            })
        }

        const currentTime = new Date()
        const expiryTime = new Date(user.forgot_password_expiry)
        if(expiryTime < currentTime){
            return res.status(400).json({
                message:"OTP is expired",
                error:true,
                success:false,
            })
        }
        if(otp!==user.forgot_password_otp){
            return res.status(400).json({
                message:"Invalid OTP",
                error:true,
                success:false,
            })
        }
        return res.status(200).json({
            message:"OTP verified successfully",
            error:false,
            success:true,
        })

    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error. Please try again later",
            error:error.message,
            success:false,
        })
    }
} 

// reset the password
export const resetPassword = async(req,res)=>{
    try {
        const {email, password, confirmPassword} = req.body
        if(!email || !password || !confirmPassword){
            return res.status(400).json({
                message:"Provide all the fields",
                error:true,
                success:false,
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"Email is not available",
                error:true,
                success:false,
            })
        }
        if(password!== confirmPassword){
            return res.status(400).json({
                message:"Password and Confirm Password must be same",
                error:true,
                success:false,
            })
        }

        const hashPass = await bcryptjs.hash(password,16)
        const update = await userModel.findOneAndUpdate(user._id,{
                password:hashPass
        })

        if(update){
            return res.status(200).json({
                message:"Password updated successfully",
                error:false,
                success:true,
            })
        }
        else{
            return res.status(400).json({
                message:"Couldn't update the password. Try again later",
                error:true,
                success:false,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error. Please try again later",
            error:error.message,
            success:false,
        })
    }
} 

// get logged in user details
export const userDetails = async(req,res)=>{
    try {
        const userId = req.user._id
        console.log("user id",userId)
        const user = await userModel.findById(userId).select("-password")
        if(user){
            return res.status(200).json({
                message:"User Details",
                data:user,
                error:false,
                success:true,
            })
        }
        else{
            return res.status(400).json({
                message:"Couldn't find user details",
                error:true,
                success:false,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error. Please try again later",
            error:error.message,
            success:false
        })
    }
} 