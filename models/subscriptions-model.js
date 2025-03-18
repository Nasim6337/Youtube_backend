const mongoose=require('mongoose');

const subscriptionSchema=mongoose.Schema({
   subscribers :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user" 
    }
},
{
    timestamps:true
})

module.exports=mongoose.model("subscriptions",subscriptionSchema);