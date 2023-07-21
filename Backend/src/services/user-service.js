import  jwt  from 'jsonwebtoken'
import UserRepository from '../repository/user-repo.js'
import bcrypt from 'bcrypt'
class UserService{
    constructor(){
        this.userrepo=new UserRepository();
    }
    async signup(data){
        try {
            const user=await this.userrepo.create(data)
            return user    
        } catch (error) {
            console.log(error);
        }
    }
    async findbyid(id)
    {
        try {
            const user= await this.userrepo.find(id);
            return user;
    } catch (error) {
        console.log(error);
    }
    }
    async getUserByEmail(email){
        try {
                const user= await this.userrepo.getByEmail({email});
                return user;
        } catch (error) {
            console.log(error);
        }
    }
    async signIn(email,plainPassword)
    {
        try {
            //console.log(email,plainPassword);
            const user= await this.userrepo.getByEmail(email)
            //console.log(user);
            if(!user)
            {
                throw   {error:"not registerd email"}
            }
            const passwordMatch= this.checkPassword(plainPassword,user.password)
            if(!passwordMatch){
                console.log('not matched');
                throw {error:"incorrect pass"}
            }

            const newJWT=this.createToken({
                email:user.email,
                id:user.id
            })
            return newJWT;

        } catch (error) {
            console.log('something wrong in signin');
           // console.log(error.name)
            throw error
        }


    }

    createToken(user){
        try {
            const result= jwt.sign(user, 'pankaj',{expiresIn:'1d'})
            return result;

        } catch (error) {
            console.log('something wrong in token creation')
            throw error
        }

 }
async isAuthenticated(token){
    try {
        const response= this.verifyToken(token)
            if(!response)
            {
                throw {error:'invalid token'}
            }
            const user=await this.userrepo.find(response.id)
            if(!user)
            {
                throw {error:'noo user with this token exist'}
            }

            return user
    } 
    catch (error) {
        console.log('something wrong in auth process')
        throw error
    }
 }

 verifyToken(token){

    try {
        console.log(token);
        const response=jwt.verify(token,'pankaj')
        return response;

    } catch (error) {
        console.log('something wrong in verify token')
        throw error
    }

 }

  checkPassword(userInputPlainPassword,encryptedPassword){
    try {
        return  bcrypt.compareSync(userInputPlainPassword,encryptedPassword)
        
    } catch (error) {
        throw error
    }
 }

}
export default UserService