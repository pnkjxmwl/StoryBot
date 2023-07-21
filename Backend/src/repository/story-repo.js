import Story from "../models/story.js";

class StoryRepository {

    async create(data)
    {
          try {
            const story = await Story.create(data);
            return story;
          } catch (error) {
                console.log(error);
          }

    }   
    async delete(id)
    {
        try {
                await Story.findByIdAndRemove(id);

        } catch (error) {
                console.log(error);
        }
    }
    async update(id,data)
    {
        try {
            const story= await Story.findByIdAndUpdate(id,data,{new:true});
            return story
        } catch (error) {
            console.log(error);
        }
    }
    async find(id)
    {

            try {
                const story= await Story.findById(id).populate({path:'userId'});
                return story;
            } catch (error) {
                    console.log(error);
            }
    }
    async  getAllStories() {
        try {
          // Use the find() method on the Story model to fetch all stories
          const stories = await Story.find().populate({path:'userId'});
      
          return stories; 
        } catch (error) {
          console.error('Error fetching stories:', error);
          throw error;
        }
      }



}

export default StoryRepository