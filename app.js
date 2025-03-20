const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const cors=require('cors');
const Userroutes=require('./routes/User-routes');
const Videoroutes=require('./routes/Video-routes');
const Commentroutes=require('./routes/Comment-routes')
const Likeroutes=require('./routes/Like-routes')
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:'*'}));

app.get('/check',(req,res)=>{
  res.status(200).json({
    "status":200,
    "message":"everything is ok"
  })
});
app.use('/api-v1/user',Userroutes);

app.use('/api-v1/video',Videoroutes);

app.use('/api-v1/comment',Commentroutes);

app.use('/api-v1/like',Likeroutes);

module.exports=app
