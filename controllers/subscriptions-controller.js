const userModel = require('../models/user-model');
const ApiError=require('../utils/ApiErrors')
const subscriptionsModel=require('../models/subscriptions-model');
const asyncHandler = require('../utils/asyncHandler');
const videoModel=require('../models/video-model');
const { default: mongoose } = require('mongoose');


const ManageSubscriptions=asyncHandler(async (req,res)=>{ 
    const {videoId,status}=req.body;
    
    const userId=req.userCookies._id;
    
    const video=await videoModel.findOne({_id:videoId});
    const videoOwner=video.owner;
   
  if(!status)  
 {   const subscription = await subscriptionsModel.findOne({ subscribers: userId, channel: videoOwner });

if (subscription) {
    return res.status(200).json({
        status: true,
        message: "already subscribed"
    });
}
else{
    return res.status(200).json({
        status: false,
        message: "Not subscribed yet"
    });
}}





if(status)
   { const subscribedUser=await subscriptionsModel.create({
        subscribers:userId,
        channel:videoOwner
    });

    res.status(200).json({
       "status":true,
        "message":"subscribed successfully" 
    })}

})

const getSubscribers=asyncHandler(async(req,res)=>{
    
    const videoId=req.body;
    
    
    const video=await videoModel.findOne({_id:videoId.videoId});
    const result=await subscriptionsModel.aggregate([
        {
            $match:{
                channel:video.owner
            }
        },
        {
            $count:'totalSubscribers'
        }
    ]) 
    
    const totalSubscribers = result.length > 0 ? result[0].totalSubscribers : 0;
    res.status(200).json({
        "totalSubscriber":totalSubscribers
    })
})

const getSubscribed=asyncHandler(async(req,res)=>{

    const userId=new mongoose.Types.ObjectId(req.userCookies._id);
    const result=await subscriptionsModel.aggregate([
        {
            $match:{
                subscribers:userId
            }
        },
        {
            $count:'totalSubscribed'
        }
    ]) 
    const totalSubscribed = result.length > 0 ? result[0].totalSubscribed : 0;
    
    res.status(200).json({
        "totalsubscribed":totalSubscribed
    })
})

module.exports={ManageSubscriptions,getSubscribers,getSubscribed}

