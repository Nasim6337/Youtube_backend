const env=require('dotenv').config();
const app=require('./app')
const DB=require('./DB/mongoDB.connection')

DB()
.then(()=>{
    app.listen(3000,()=>{
        console.log("server is running at 3000 PORT")
    })
})

