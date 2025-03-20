const mongoose=require('mongoose');

const DB=async()=>{
    try{
        await mongoose.connect(`mongodb+srv://mnas57189:${process.env.MONGO_PASS}@you-tube.yjsf7.mongodb.net/?retryWrites=true&w=majority&appName=you-tube`).then(()=>{
            console.log("connection established")
        })
    }catch(err){
      
    }
}

module.exports=DB
