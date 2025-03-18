const userModel = require('../models/user-model');
const ApiError=require('../utils/ApiErrors')
const cloudinaryUploader=require("../utils/cloudinary")
const asyncHandler = require('../utils/asyncHandler');
const deleteFiles=require('../utils/deleteUploadedFiles')
const videoModel=require('../models/video-model')
const mongoose=require('mongoose')

const register=asyncHandler(
   async(req,res)=>{
      const {userName,fullName,email,password}=req.body;
      const avatar = req.files?.avatar?.[0]?.path; 
      const coverImage = req.files?.coverImage?.[0]?.path;
      
    
      if(!( email &&  userName && password) ){
        return res.status(200).json({
          success:false,
          message:"Please fill all required filled"
        })
      }

      if (!avatar || !coverImage) {
        return res.status(200).json({
          success:false,
          message:"avatar and coverimage are required"
        })
      }
      const avatarUploaded=await cloudinaryUploader(avatar)
      const coverImageUploaded=await cloudinaryUploader(coverImage);
      const coverImageUrl=coverImageUploaded.url;
      const avatarUrl=avatarUploaded.url;
      
      
      await deleteFiles([avatar,coverImage])
  
      let user=await userModel.findOne({email});
      if(user){
       return res.status(200).json({
        success:false,
          message:"user already registered"
        })
      
      }
    
      let createdUser=await userModel.create({
        userName,
        fullName,
        email,
        password,
        avatar:avatarUrl,
        coverImage:coverImageUrl
      })

     

        res.status(200).json({
        success:true,
        message:"user created successfully"
      })
      
     } 
    
)



const login=asyncHandler(async(req,res)=>{
  const {email,password}=req.body;
  if(!(email && password)){
    return res.status(200).json({
      success:false,
      message:"Please fill all required filled"
    })
  }
  
  let user=await userModel.findOne({email});
  if(!user){
    return res.status(200).json({
      success:false,
      message:"user does not exists. Please register first then try login"
    })
  }


  if(await user.isCorrectPassword(password)){
      let token =await user.generateToken();
      user.refreshToken=token;
      await user.save();
      res.cookie("token",token)
      
      return res.status(200).json({
        success:true,
        message:"user logged in successfully"
      })
  }
  else{
     return res.status(200).json({
          success:false,
          message:"Please check your creadential before login"
        })
  }


})


const logout=asyncHandler(async(req,res)=>{
       let user=await userModel.findByIdAndUpdate(req.userCookies._id,{
        $set:{refreshToken:null}      
       },
      {new:true});
      res.clearCookie("token");
      res.status(200).json({
        success:true,
        "message":"User successfully Log Out"
      })

})


const changePassword=asyncHandler(async(req,res)=>{
  const {oldPassword,newPassword}=req.body;
  const userid=req.userCookies._id;

  
  if(!oldPassword || !newPassword){
    res.status(403).json({
      status:false,
      message:"Please fill all required filled"
    })
    return;
  }

  if(oldPassword===newPassword){
    res.status(403).json({
      status:false,
      message:"Old and new Password can not be same"
    })
    return;
  }


  const user=await userModel.findById(userid);
  const result=await user.isCorrectPassword(oldPassword)
  if(!result){
    res.status(403).json({
      status:false,
      message:"You have entered incorrect old password"
    })
    return
  }
  
   user.password=newPassword;
   await user.save();

  // const updatedUser=await userModel.findByIdAndUpdate(userid,{
  //   $set:{password:newPassword}},
  //   {new:true})

    res.status(200).json({
      "message":"updated successfully",
      status:true
    })
  })


const editProfile=asyncHandler(async(req,res)=>{
  
  const avatar = req.files?.avatar?.[0]?.path; 
  const coverImage = req.files?.coverImage?.[0]?.path;
const {userName}=req.body;

if(!userName && !avatar && !coverImage){
  res.status(404).json({
    status:false,
    message:"please enter data for editing profile"
  })
  return;
}

const avatarUploaded = avatar ? await cloudinaryUploader(avatar) : null;
const coverImageUploaded = coverImage ? await cloudinaryUploader(coverImage) : null;


if(avatar || coverImage)
  await deleteFiles([avatar, coverImage]);

const updateData = {};
if (userName) updateData.userName = userName;
if (avatarUploaded) updateData.avatar = avatarUploaded.url;
if (coverImageUploaded) updateData.coverImage = coverImageUploaded.url;

// Update user in the database
const updatedUser = await userModel.findByIdAndUpdate(
  req.userCookies._id,
  updateData,
  { new: true }
);

if (!updatedUser) {
  return res.status(404).json({
    status: false,
    message: "User not found or update failed.",
  });
}


res.status(200).json({
  status: true,
  message: "Profile updated successfully."
});

})

const getWatchHistory=asyncHandler(async(req,res)=>{

const videoId=req.body;

const userId=req.userCookies._id;

const user=await userModel.findByIdAndUpdate({_id:userId},
  { $push: { watchHistory: videoId.videoId } },
  {new:true}
)
 


res.status(200).send("ok");
})

const getUser=asyncHandler(async(req,res)=>{
    const userId=req.userCookies._id;
    const user=await userModel.findOne({_id:userId})

    res.status(200).json({
      "status":true,
      user
    })
})

const getWatchHistoryVideo=async(req,res)=>{
  
  const userId=new mongoose.Types.ObjectId(req.userCookies._id);;
  const HistoryVideo=await userModel.aggregate([
    {
      $match:{_id:userId}
    },
      {

        $lookup:{
          from: "videos",
          foreignField: "_id",
          localField: "watchHistory",
          as: "watchHistory"

        }
      },
      {
        $unwind:"$watchHistory"
      },

      {
        $project:{_id:0,watchHistory:1}
      }
  ])
  
  res.status(200).json({
    "status":true,
    HistoryVideo
  })
}

module.exports={register,login,logout,changePassword,editProfile,getWatchHistory,getUser,getWatchHistoryVideo}