import User from '../model/userSchema.js';


export const userSignup= async(request,response)=>{
    try{
        const exist = await User.findOne({ username: request.body.username });
        if(exist) {
            return response.status(401).json({ message: 'User already exist'});
        }
        const user=request.body;
        const newuser=new User(user);
        await newuser.save();

        response.status(200).json(`${user.firstName} has been successfully registered`);
    }
    catch(error)
    {
        console.log(error.message);
    }
}

export const userLogin =async(request,response) =>{
    try{
        let user=await User.findOne({ username: request.body.username ,password: request.body.password });

        if(user){
            return response.status(200).json(`${request.body.username} login successful`);
        }
        else{
            return response.status(401).json('Invalid Login');
        }
    }
    catch(error)
    {
        console.log(error.message);
    }
}
