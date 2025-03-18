const express=require('express');
const router=express.Router();
const loginAuthenticator=require('../middleware/auth.middle');
const {createDisLike,createLike,displayLikes}=require('../controllers/like-controller')

router.route('/like').post(loginAuthenticator,createLike);

router.route('/disLike').post(loginAuthenticator,createDisLike);

router.route('/displayLikes').post(displayLikes);

module.exports=router;