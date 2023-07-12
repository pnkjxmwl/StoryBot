import express from 'express'
import { connect } from './config/database.js';
const app= express();
import Story from './models/story.js';
import user from './models/user.js';
import StoryRepository from './repository/story-repo.js';
import StoryService from './services/story-service.js';

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


    const storyservice=new StoryService()
    const story=await storyservice.create("a story on india","64aee167ec1b89ca9f80a8f3");
    console.log(story);
})