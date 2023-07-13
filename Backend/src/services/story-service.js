import {StoryRepository,UserRepository } from '../repository/index.js'
import { Configuration, OpenAIApi } from "openai";
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
                //console.log(theme,content,userId);
                const inputText=`write a story about ${content} in the theme ${theme} under 100 words`;
                const storycontent=await this.getChatGPTResponse(inputText)
               // console.log(storycontent);
                var user=await this.userrepo.find(userId);

                const story= await this.storyrepo.create(
                    {
                        content:storycontent,
                        userId:userId
                    }
                )
                user.stories.push(story);
                await user.save();
                return story
            } catch (error) {
                console.log(error);
            }

        }
        async get(id)
        {
            try {
                    const story= await this.storyrepo.find(id)
                    return story
            } catch (error) {
                console.log(error);
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