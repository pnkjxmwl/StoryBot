import {StoryRepository,UserRepository } from '../repository/index.js'

class StoryService{

        constructor()
        {
            this.storyrepo=new StoryRepository(),
            this.userrepo= new UserRepository()
        }

        async create(content,userId)
        {   

            try {
                var user=await this.userrepo.find(userId);
                const story= await this.storyrepo.create(
                    {
                        content:content,
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


}
export default StoryService