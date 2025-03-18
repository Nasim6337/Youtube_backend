const likeModel=require('../models/like-model');
const asyncHandler=require('../utils/asyncHandler');


const createLike=asyncHandler(async(req,res)=>{
    const videoId=req.body;
    const likes=await likeModel.findOne({likedVideo:videoId});

    if(!likes){
        const createdLike=await likeModel.create({
            like:1,
            likedVideo:videoId
        })

        res.status(200).json({
            success:true
        })

        return;

    }

    if(likes){
         likes.like=likes.like+1;
        await likes.save();

        res.status(200).json({
            success:true
        })

    }
})

const createDisLike=asyncHandler(async(req,res)=>{
    const videoId=req.body;
    const DisLikes=await likeModel.findOne({likedVideo:videoId});

    if(!DisLikes){
        const createdDisLiked=await likeModel.create({
            disLike:1,
            likedVideo:videoId
        })

        res.status(200).json({
            success:true
        })

        return;
        
    }

    if(DisLikes){
            DisLikes.disLike=DisLikes.disLike+1;
            await DisLikes.save();

            res.status(200).json({
                success:true
            })
    }
})

const displayLikes=asyncHandler(async(req,res)=>{
    const videoId=req.body;

    if(!videoId){
        res.status(403).json({
            success:false,
            message:"video id not found"
        })
        return;
    }

    const likeData=await likeModel.aggregate([
        {
            $match:{likedVideo:videoId}
        },
        {
            $project:{like:1,disLike:1,_id:0}
        }
    ])

    res.status(200).json({
        success:true,
        likeData
    })
})

module.exports={createLike,createDisLike,displayLikes}