import {StoryRepository,UserRepository } from '../repository/index.js'
import { Configuration, OpenAIApi } from "openai";
import { separateIntoParts,generateImages } from '../utils/utils.js';
import dotenv from "dotenv";
dotenv.config();


class StoryService{

        constructor()
        {
            this.storyrepo=new StoryRepository(),
            this.userrepo= new UserRepository()
        }
        

        async create(theme,content,userId)
        {   

            try {
                const storytitle=content
                const inputText=`
                I want you to act as a storyteller.  You will write a story in under 200 words . My first request is "I am going to write a short story about ${content} on the theme ${theme}`;
                var storycontent=await this.getChatGPTResponse(inputText)

                const partsArray = separateIntoParts(storycontent);

               if(!storycontent)
               {
                throw {error:"Chatgpt doesnt give the Story"};
               }
              const imagesArr=await generateImages(partsArray)
                var user=await this.userrepo.find(userId);

                const story= await this.storyrepo.create(
                    {
                        content:partsArray,
                        userId:userId,
                        images:imagesArr,
                        title:storytitle
                    }
                )
                user.stories.push(story);
                await user.save();
                const storyy= {
                    content:partsArray,
                    img:imagesArr,
                    title:storytitle
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
        async getAll()
        {
            try {
                    const story= await this.storyrepo.getAllStories();
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