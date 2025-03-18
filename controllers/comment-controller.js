const commentModel=require('../models/comment-model');
const asyncHandler=require('../utils/asyncHandler');

const createComment=asyncHandler(async(req,res)=>{
    const {comment,videoId}=req.body;
    
    const userId=req.userCookies._id;
    if(!userId){
        res.status(404).json({success:false,
            message:'please login first'
        })
        return;
    }

    if(!comment){
        res.status(200).json({success:false})
        return;
    }

    const createdComment=await commentModel.create({
        comment,
        commentUser:userId,
        commentedVideo:videoId
    })

    res.status(200).json({
        success:true
    })
});


const displayComment=async(req,res)=>{
    const videoId=req.body;
    
    if(!videoId){
        res.status(403).json({
            status:false,
            message:"video id not found"
        })
        return;
    }

    const comments=await commentModel.find({commentedVideo:videoId.videoId}).populate("commentUser","userName")
    ;
    res.status(200).json({
        success:true,
        comments
    })
}

module.exports={createComment,displayComment}