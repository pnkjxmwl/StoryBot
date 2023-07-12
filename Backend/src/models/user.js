import mongoose from "mongoose";

const userSchema= new mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    stories:[
        {
           type:mongoose.Schema.Types.ObjectId,
            ref:'Story'
        }
    ]


},{timestamps:true})

const user=  mongoose.model('user',userSchema)
export default user;