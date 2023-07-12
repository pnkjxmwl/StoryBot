import {UserRepository} from '../repository/index.js'

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
                const user= await this.userrepo.findBy({email});
                return user;
        } catch (error) {
            console.log(error);
        }
    }
}
export default UserService