const asyncHandler = require("../utils/asyncHandler");
const jwt=require('jsonwebtoken');
const loginAuthenticator = asyncHandler(async (req, res, next) => {
    
    let token=req.cookies.token

    if (!token) {
        return res.status(200).json({ message: "you have not logged in" });
    }
    else{
        try{
            let verified_data=jwt.verify(req.cookies.token,process.env.ACCESS_TOKEN);
            req.userCookies=verified_data;
        }catch(err){console.log("token verification error")}
    }
    next();

  
});



module.exports=loginAuthenticator