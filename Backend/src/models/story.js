import mongoose from "mongoose";

const storySchema= new mongoose.Schema({

    content:{
        type:String,
        required:true,
        max:[300,'Stories Cannot be More than 300 Characters']
    }

},{timestamps:true})

const Story= mongoose.model('Story',storySchema);
export default Story;