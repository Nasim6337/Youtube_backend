const mongoose=require('mongoose');

const DB=async()=>{
    try{
        await mongoose.connect(`mongodb+srv://nasimali7518:${process.env.MONGO_PASS}@cluster0.3ojnj.mongodb.net/youtube?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
            console.log("connection established")
        })
    }catch(err){
      
    }
}

module.exports=DB