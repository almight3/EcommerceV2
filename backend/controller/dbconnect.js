const mongoose = require('mongoose');

const connectDataBase = () =>{

    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log('db connected successfully')
    })
    .catch((err)=>{
        console.log("error while connecting DB")
        console.log(err)
    })
}

module.exports = connectDataBase;