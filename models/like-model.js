const mongoose=require('mongoose');


const likeSchema=mongoose.Schema({
    like:{
        type:Number,
        default:0
    },
    disLike:{
        type:Number,
        default:0
    },
    likedVideo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"video"
    }
})

module.exports=mongoose.model('like',likeSchema)