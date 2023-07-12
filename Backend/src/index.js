import express from 'express'
import { connect } from './config/database.js';
const app= express();
import Story from './models/story.js';
import user from './models/user.js';
app.listen(4000,async ()=>{
    console.log('App started at PORT 4000');
    await connect();
   console.log("Database Connected");
//    await Story.create({content:"A Story on Cats "})
//    console.log('Story Created');
    await user.create({email:"a@b.com",password:"1234",name:"pankaj"});
})