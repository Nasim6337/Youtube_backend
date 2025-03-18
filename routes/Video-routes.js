const express = require('express');
const router=express.Router();
const upload=require('../utils/multer');
const loginAuthenticator=require('../middleware/auth.middle')

const {uploadVideo,editVideoDetails,myVideos,videos,getVideoDetail,manageViews,deleteVideo}=require('../controllers/video-controllers');

router.route('/uploadVideo').post(loginAuthenticator,upload.fields([
    { name: 'videoFile', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
]),uploadVideo);


router.route('/myVideos').get(loginAuthenticator,myVideos)

router.route('/editVideoDetails').patch(loginAuthenticator,upload.single('thumbnail'),editVideoDetails);

router.route('/videos').get(videos);

router.route('/getVideoDetail').post(getVideoDetail)

router.route('/manageViews').post(manageViews)

router.route('/deleteVideo').post(loginAuthenticator,deleteVideo)

module.exports=router

