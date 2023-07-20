import {StoryRepository,UserRepository } from '../repository/index.js'
import { Configuration, OpenAIApi } from "openai";
import { separateIntoParts } from '../utils/utils.js';
import Replicate from 'replicate';
dotenv.config();
// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });
import dotenv from "dotenv";

class StoryService{

        constructor()
        {
            this.storyrepo=new StoryRepository(),
            this.userrepo= new UserRepository()
        }
        

        async create(theme,content,userId)
        {   

            try {
                console.log(theme,content,userId);
                const inputText=`
                I want you to act as a storyteller. 
                You will write a story in under 100 words in three parts,
                the parts should be sepearted by a character & and 
                only write the story no theme, no title, nothing else. 
                My first request is "I am going to write a short story about ${content} on the theme ${theme}`;
                var storycontent=await this.getChatGPTResponse(inputText)
                console.log(storycontent);

                const partsArray = separateIntoParts(storycontent);
                console.log(partsArray);

               if(!storycontent)
               {
                throw {error:"Chatgpt doesnt give the Story"};
               }
              //  const image = await replicate.run(
              //   "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
              //   {
              //     input: {
              //       prompt: storycontent
              //     }
              //   }
              // );
                var user=await this.userrepo.find(userId);

                const story= await this.storyrepo.create(
                    {
                        content:partsArray,
                        userId:userId
                    }
                )
                const image="";
                user.stories.push(story);
                await user.save();
                const storyy= {
                    content:partsArray,
                    img:image
                }
                return storyy
               
            } catch (error) {
                console.log(error);
                throw error
            }

        }
        async get(id)
        {
            try {
                    const story= await this.storyrepo.find(id)
                    return story
            } catch (error) {
                console.log(error);
                throw error
            }
        }
        async  getChatGPTResponse(inputText) {
            const configuration = new Configuration({
              apiKey: process.env.OPENAI_API_KEY,
            });
            const openai = new OpenAIApi(configuration);
          
            const messages = [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: inputText },
            ];
          
            try {
              const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: messages,
              });
          
              const completion_text = response.data.choices[0].message.content;
              return completion_text;
            } catch (error) {
              console.error("Error:", error.message);
              return null;
            }
          }

}
export default StoryService