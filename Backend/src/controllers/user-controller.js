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
            //console.log(req.query);
            const user= await userservice.findbyid(req.query.id)
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
export const signIn= async(req,resp)=>{
    try {
        const response =await userservice.signIn(req.body.email,req.body.password)
        return resp.status(201).json({
            data:response,
            success:true,
            message:'Succesfully sign in user',
            err:{}
        })

    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            data:{},
            success:false,
            message:error.message,
            err:error
        })
    }
}
export const isAuthenticated= async (req,resp)=>{

    try {
        const token=req.headers['x-access-token'];
        console.log(token);
        const response=await userservice.isAuthenticated(token)     
        return resp.status(200).json({
            success:true,
            err:{},
            data:response,
            message:'user is authenticated and token is valid'
        })
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            data:{},
            success:false,
            err:error
        })
    }

}
