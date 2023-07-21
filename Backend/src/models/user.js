import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const SALT=bcrypt.genSaltSync(10);

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
    ],
  isPasswordHashed: { type: Boolean, default: false }


},{timestamps:true})
userSchema.pre('save', async function (next) {
    try {

    if(!this.isPasswordHashed){
      const encryptedPassword = await bcrypt.hashSync(this.password, SALT);
      this.password = encryptedPassword;
      this.isPasswordHashed=true;
    }
      next();
    } catch (err) {
      return next(err);
    }
  });
const user=  mongoose.model('user',userSchema)
export default user;