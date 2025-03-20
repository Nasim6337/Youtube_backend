const mongoose=require('mongoose');

const DB=async()=>{
 try {
        await mongoose.connect(`mongodb+srv://mnas57189:${process.env.MONGO_PASS}@you-tube.yjsf7.mongodb.net/?retryWrites=true&w=majority&appName=you-tube`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 20000, 
            socketTimeoutMS: 45000,
        });
        console.log("MongoDB connection established");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1); // Exit the process if MongoDB fails to connect
    }
}

module.exports=DB
