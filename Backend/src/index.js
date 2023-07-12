import express from 'express'
import { connect } from './config/database.js';
import bodyParser from 'body-parser';
import apiRoutes from './routes/index.js'
const app= express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api',apiRoutes)
import Story from './models/story.js';
import user from './models/user.js';
import StoryRepository from './repository/story-repo.js';
import StoryService from './services/story-service.js';
import UserService from './services/user-service.js';




app.listen(4000,async ()=>{
    console.log('App started at PORT 4000');
    await connect();
   console.log("Database Connected");
  
  
  
   // const story=await Story.create({content:"A Story on Dogs ",userId:"64aee167ec1b89ca9f80a8f3"})
    // const us= await user.findById("64aee167ec1b89ca9f80a8f3");
    // us.stories.push(story)
    // us.save();
    // console.log(story);
    // console.log(us);
//    console.log('Story Created');
  //await user.create({email:"a@b.com",password:"1234",name:"pankaj"});

    // const storyrepo= new StoryRepository();
    // const story=await storyrepo.find("64aee76937a9b116992b0155");
    // console.log(story);


    // const storyservice=new StoryService()
    // const story=await storyservice.create("latest story","64aef2d479e5814469d124c9");
    // console.log(story);

    // const userservice= new UserService()
    // const user= await userservice.findbyid("64aef2d479e5814469d124c9")
    // // const user= await userservice.signup({
    // //     email:"rahul@gmail.com",
    // //     password:"789",
    // //     name:"rahul",
    // //     stories:[]
    // // })
    // console.log(user);
})