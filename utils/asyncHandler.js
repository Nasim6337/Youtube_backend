

const asyncHandler=(args_function)=>async(req,res,next)=>{
    try{
       return await  args_function(req,res,next);
                next();

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
module.exports=asyncHandler;