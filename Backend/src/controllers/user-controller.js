import user from '../models/user.js';
import UserService from '../services/user-service.js'

const userservice= new UserService();

export const createUser= async (req,resp)=>{

    try {
            const user= await userservice.signup(
                {
                    email:req.body.email,
                    password:req.body.password,
                    name:req.body.name,
                    stories:[]
                }
            );
                return resp.status(200).json({
                    success:true,
                    message:"Succesfully created User",
                    data:user,
                    err:{}
                })

    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            success:false,
            message:"Not Succesfull In createing a User",
            data:{},
            err:error
        })
    }
}

export const getUser= async(req,resp)=>{

        try {
            const user= await userservice.findbyid(req.body.id)
            return resp.status(200).json({
                success:true,
                message:"Succesfully Fetched User",
                data:user,
                err:{}
            })    
        } catch (error) {
            console.log(error);
            return resp.status(500).json({
                success:false,
                message:"Not Succesfull In Fetching a User",
                data:{},
                err:error
            })
        }

}