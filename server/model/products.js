const mongoose = require('mongoose');


const products = mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true 
    },
    packSize:{
        type:Number,       
        required:true 
    },
    category:{
        type:String,
        required:true 

    },
    mrp:{
        type:Number,
        required:true 
    },
    status:{
        type:Boolean,
        required:true 
    },
   

})

module.exports = mongoose.model('product',products)