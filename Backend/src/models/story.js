import mongoose from "mongoose";

const storySchema= new mongoose.Schema({

    content:{
        type:String,
        required:true,
        max:[300,'Stories Cannot be More than 300 Characters']
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }

},{timestamps:true})

const Story= mongoose.model('Story',storySchema);
export default Story;