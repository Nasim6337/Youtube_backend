const express=require('express');
const router=express.Router();
const {createComment,displayComment}=require('../controllers/comment-controller');
const loginAuthenticator=require('../middleware/auth.middle');
router.route('/createComment').post(loginAuthenticator,createComment);

router.route('/comments').post(displayComment);

module.exports=router;