const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
      name:{
          type:String,
          required:[true,"please enter product name"]
      },
      description:{
          type:String,
          required:[true,'please enter description ']
      },
      price:{
       type:Number,
       required:[true,'please enter price'],
       maxLength:[6,"price cannot be greater then 100000"]     
    },
    rating:{
        type:Number,
        default:0
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
            image_url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
     type:String,
     required:[true,"enter product category" ]  
    },
    stock:{
      type:Number,
      required:[true,"please enter product stocks"],
      maxLength:[4,"stocks limit exceed"],
      default:1
    },
    noOfReview:{
        type:Number,
        default:1,
    },
    review:[{
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }],
    createDate:{
        type:Date,
        default:Date.now
    }
})

const Product = mongoose.model('Product',productSchema);
module.exports = Product;
