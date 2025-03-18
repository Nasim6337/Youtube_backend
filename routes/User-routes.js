const express=require('express');
const router=express.Router();
const {register,login,logout,changePassword,editProfile,getWatchHistory,getUser,getWatchHistoryVideo}=require('../controllers/user-controllers')
const upload=require('../utils/multer')

const {ManageSubscriptions,getSubscribed,getSubscribers}=require('../controllers/subscriptions-controller')


const loginAuthenticator=require('../middleware/auth.middle')

router.route('/register').post(upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),register)

router.route('/login').post(login)

router.route('/logout').post(loginAuthenticator,logout);

router.route('/changePassword').patch(loginAuthenticator,changePassword);

router.route('/editProfile').patch(loginAuthenticator,upload.fields([
  {name:'avatar',maxCount:1},
  {name:'coverImage',maxCount:1}
]),editProfile);

router.route('/manageSubscriptions').post(loginAuthenticator,ManageSubscriptions)

router.route('/getSubscribers').post(getSubscribers);

router.route('/getsubscribed').get(loginAuthenticator,getSubscribed)

router.route('/getWatchHistory').post(loginAuthenticator,getWatchHistory);

router.route("/getUser").get(loginAuthenticator,getUser)

router.route("/getWatchHistoryVideo").get(loginAuthenticator,getWatchHistoryVideo);

module.exports=router;