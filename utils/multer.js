const multer=require('multer');
const path=require('path');

const storage = multer.diskStorage(
  { destination: (req,file,cb)=>{
    cb(null,"./public")
  },
     filename: (req, file, cb) => { 
      const uniqueSuffix= Date.now()  + path.extname(file.originalname)
      cb(null, file.fieldname + '-' +uniqueSuffix); 

}})


const upload = multer({ storage: storage });
  

module.exports=upload