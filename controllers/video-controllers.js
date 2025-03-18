const ApiError = require("../utils/ApiErrors");
const cloudinaryUploader = require("../utils/cloudinary");
const asyncHandler = require("../utils/asyncHandler");
const deleteFiles = require("../utils/deleteUploadedFiles");
const videoModel = require("../models/video-model");
const mongoose = require("mongoose");

const uploadVideo = asyncHandler(async (req, res, next) => {
  const userId = req.userCookies._id;

  const videoFile = req.files?.videoFile?.[0]?.path;
  const thumbnail = req.files?.thumbnail?.[0]?.path;
  const { title, descriptions } = req.body;

  if (!(title && descriptions)) {
    res.status(400).json({
      status:false,
      message:"Please provide video title  and descriptions"
    })
    return;
  }

  if (!(videoFile && thumbnail)) {
    res.status(400).json({
      status:false,
      message:"Please provide video and thumbnail files"
    })
    return;
  }

  const videoUploadURL = await cloudinaryUploader(videoFile);
  const thumbnailUploadURL = await cloudinaryUploader(thumbnail);

  deleteFiles([videoFile, thumbnail]);

  const uploadedVideo = await videoModel.create({
    videoFile: videoUploadURL.url,
    thumbnail: thumbnailUploadURL.url,
    owner: userId,
    title,
    descriptions,
    duration: videoUploadURL.duration,
    isPublished: true,
  });

  res.status(200).json({
    status:true,
    message: "video uploaded successfully",
  });
});

const myVideos = asyncHandler(async (req, res) => {
  const userId = req.userCookies._id;
  const videos = await videoModel.find({ owner: userId }).populate("owner"," avatar userName ");
  res.status(200).json({
    videos,
  });
});

const editVideoDetails = asyncHandler(async (req, res) => {
  
  const { title, descriptions,videoId } = req.body;
  const thumbnail = req.file?.path;
  const video = await videoModel.findOne({ _id: videoId });
 
  const thumbNail='';
  if(thumbnail){
     thumbNail = await cloudinaryUploader(thumbnail);
    await deleteFiles([thumbnail]);
  }
  await video.UpdateTitle(title);
  await video.UpdateDescription(descriptions);
  await video.UpdateThumbnail(thumbNail.url);
  await video.save();

  res.status(200).json({
    message:"update successfully",
    status:true
  });
});

const videos = asyncHandler(async (req, res) => {
  const videos = await videoModel.find();
  const owner = await videoModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerInfo",
      },
    },
    { $unwind: "$ownerInfo" },
    { $project: { "ownerInfo.userName": 1,"ownerInfo.avatar":1 ,_id: 0 } },
  ]);

  res.status(200).json({
    message: "success",
    videos: videos,
    owner,
  });
});

const getVideoDetail = asyncHandler(async (req, res) => {
  const videoid = req.body;

  // Find the video by its ID
  const video = await videoModel.findById(videoid.videoid).populate("owner", "userName avatar") .select("-_id");
//   const owner = await videoModel.aggregate([
//     {$match:{_id:video._id}
//     },
//     { 
//       $lookup: {
//         from: "users",
//         localField:"owner",
//         foreignField: "_id",
//         as: "ownerInfo",
//       },
//     },
//     {
//         $unwind:"$ownerInfo"
//     },
//     {
//         $project:{"ownerInfo.userName":1,_id:0}
//     }
//   ]);

  if (!video) {
    return res.status(200).json({ error: "Video not found" });
  }

  res.status(200).json({
     video,
    });
});

const manageViews=asyncHandler(async(req,res)=>{
    const videoId=req.body;
    const video=await videoModel.findOne({_id:videoId.videoId});
    video.views=video.views+1;
    await video.save();
    
})

const deleteVideo=asyncHandler(async(req,res)=>{
  videoId=req.body;
  const deletedVideo=await videoModel.findByIdAndDelete(videoId.videoId);
  
  if (!deletedVideo) {
    return res.status(404).json({ message: "Video not found" });
  }

 
  res.status(200).json({ message: "Video deleted successfully"});
})

module.exports = {
  uploadVideo,
  editVideoDetails,
  myVideos,
  videos,
  getVideoDetail,
  manageViews,
  deleteVideo
};
