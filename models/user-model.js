const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema= mongoose.Schema({
    userName:{
        type:String,
        max:20,
        trim:true,
        lowercase:true
    },
    email:String,
    fullName:String,

    avatar: { type: String, required: true },
    coverImage: { type:String, required: true },

    password:String,
    refreshToken:String,
    watchHistory:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"video"
    }],
},
{
    timestamps:true
})


userSchema.pre("save",async function(next){

    if( ! this.isModified("password")){
        console.log("may be you update something")
return next();
    }

    let pass=await bcrypt.hash(this.password,10);
   this.password=pass;
    next();
})

userSchema.methods.isCorrectPassword=async function(password,next){
return await bcrypt.compare(password,this.password)
next();
}

userSchema.methods.generateToken=async function(){
    let token=await jwt.sign({_id:this._id,
        email:this.email,
        userName:this.userName
    },process.env.ACCESS_TOKEN)
    
   return token;


}




module.exports=mongoose.model("user",userSchema)