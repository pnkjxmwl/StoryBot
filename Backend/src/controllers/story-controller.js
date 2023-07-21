import StoryService from "../services/story-service.js";

const storyservice = new StoryService();

export const createstory= async (req,resp)=>{

        try {
            console.log("in controller",req.body.theme,req.body.content,req.body.userId);
                const response= await storyservice.create(req.body.theme,req.body.content,req.body.userId)
                return resp.status(200).json({
                    success:true,
                    message:"Succesfull in Creating a Story",
                    data:response,
                    err:{}
                })
        } catch (error) {
            console.log(error);
            return resp.status(500).json({
                success:false,
                message:'Not Success in Creating a new Story',
                data:{},
                err:error
            })
        }

}

export const getStory= async (req,resp)=>{

    try {
        const response= await storyservice.get(req.query.id)
        return resp.status(201).json({
            success:true,
            message:'SuccesFully fetched  story',
            data:response,
            err:{}
        }) 
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            success:false,
            message:'Not Success in fetching  story',
            data:{},
            err:error
        })
    }
}
export const getAllStory= async (req,resp)=>{

    try {
        const response= await storyservice.getAll();
        return resp.status(201).json({
            success:true,
            message:'SuccesFully fetched All stories',
            data:response,
            err:{}
        }) 
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            success:false,
            message:'Not Success in fetching  All stories',
            data:{},
            err:error
        })
    }
}