import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    bookname:{type:String,required:true},
    desc:{type:String,required:true},
    author:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
},{timestamps:true})

export default mongoose.model("Book",bookSchema)