import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true,
    },

    productName : {
        type : String,
        required : true,
    },
    altName : [
        {
            type : String
        }
    ],

    description : {
        type : String,
        required : true,
    },

    img : [
        {type : String}
    ],

    price : {
        type : Number,
        required : true,
    },

    labelPrice : {
        type : Number,
        required : true
    },

    stock : {
        type : Number,
        required : true,
    },

    isAvailable : {
        type : Boolean,
        required : true,
        default : true,
    },
    
},{timestamps : true})

const product = mongoose.model("product", productSchema);

export default product