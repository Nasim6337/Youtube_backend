const mongoose=require('mongoose');


const commentSchema=mongoose.Schema({

    comment:{
        type:String
    },
    commentUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    commentedVideo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"video"
    }

})

module.exports=mongoose.model("comment",commentSchema);