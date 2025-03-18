const mongoose=require('mongoose');

const videoSchema=mongoose.Schema({
    videoFile:String,
    thumbnail:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:String,
    descriptions:String,
    duration:Number,
    views:{
        type:Number,
        default:0
    },
    isPublished:Boolean
},{
    timestamps:true
})


videoSchema.methods.UpdateTitle=async function(title,next){
this.title=title;

}

videoSchema.methods.UpdateDescription=async function(descriptions,next){
    this.descriptions=descriptions;
    
}

videoSchema.methods.UpdateThumbnail=async function(url,next){
    this.thumbnail=url;
    
}

module.exports=mongoose.model('video',videoSchema)