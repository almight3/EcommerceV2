const express = require('express')
const app =  express()
const dotenv = require('dotenv')
const connectDataBase = require('./controller/dbconnect')
const productRoutes = require('./routes/producRoutes')
const bodyParser = require('body-parser')
const middlewareErrorHandler = require('./middleware/errorhandler')

// config dotenv
dotenv.config();
// connecting DB 
connectDataBase();
//body parser
app.use(express.json())
// product routes
app.use(productRoutes)
// error handling for product routes middleware function 
app.use(middlewareErrorHandler)

// server up and running  at port 8080
app.listen(process.env.PORT,()=>{
    console.log("server listing at port 8080")
})