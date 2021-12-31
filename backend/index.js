const express = require('express')
const app =  express()
const dotenv = require('dotenv')
const connectDataBase = require('./controller/dbconnect')
// config dotenv
dotenv.config();
// connecting DB 
connectDataBase();


app.listen(process.env.PORT,()=>{
    console.log("server listing at port 8080")
})