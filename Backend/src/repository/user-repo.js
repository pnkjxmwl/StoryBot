import user from "../models/user.js";
class UserRepository {

    async create(data)
    {
          try {
            const User = await user.create(data);
            return User;
          } catch (error) {
                console.log(error);
          }

    }   
    async delete(id)
    {
        try {
                await user.findByIdAndRemove(id);

        } catch (error) {
                console.log(error);
        }
    }
    async update(id,data)
    {
        try {
            const User= await user.findByIdAndUpdate(id,data,{new:true});
            return User
        } catch (error) {
            console.log(error);
        }
    }
    async getByEmail(email){
        try {
            const User= await user.findOne({

                    email:email
            })
            if(!user){
                
                throw error={
                    name:'AttributeNotFound',
                    message:'Invalid Email Sent in Request',
                    explanation:'Please check if email is registered',
                    statusCode:404
                    }
            }
            return User
         } catch (error) {
             console.log("something wrong in user repo");
             throw error
         }
    }
    async find(id)
    {

            try {
                const User= await user.findById(id).populate({path:'stories'});
                return User;
            } catch (error) {
                    console.log(error);
            }

    }



}

export default UserRepository