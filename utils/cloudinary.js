const cloudinary=require('cloudinary').v2;
const asyncHandler=require('../utils/asyncHandler')
const ApiErrors=require('../utils/ApiErrors')


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key:process.env.CLOUDINARY_KEY, 
    api_secret:process.env.CLOUDINARY_SECRET
});

const cloudinaryUploader=asyncHandler(async (localpath)=>{
    if(!localpath){
        throw new ApiErrors("Local path is required for cloudinary")
        return;
    }

    const uploadResult = await cloudinary.uploader
    .upload(
        localpath, {
            resource_type:"auto"
        }
    )
    .catch((error) => {
        console.log(error);
    });
    return uploadResult;
})


module.exports=cloudinaryUploader



