const mongoose=require('mongoose')
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Mongodb connected')

    }
    catch(error){
        console.log('db not connected',error.message);
    }

}

module.exports=connectDb;