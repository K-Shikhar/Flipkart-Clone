import mongoose from 'mongoose';


const connection=async (username,password) =>{
const URL= `mongodb+srv://${username}:${password}@ecommerce.l8bqa.mongodb.net/PROJECT_0?retryWrites=true&w=majority`;

    try{
        await mongoose.connect(URL,{useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false});
        console.log('Database Connected Successfully');
    }
    catch(error)
    {
        console.log('error:' ,error.message);
    }
}

export default connection;


