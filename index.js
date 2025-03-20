const env=require('dotenv').config();
const app=require('./app')
const DB=require('./DB/mongoDB.connection')
const port = process.env.PORT || 4000;
DB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running at ${port}`)
    })
})

