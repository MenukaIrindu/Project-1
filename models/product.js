import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    altNames : {
        type : [String],
        default : []
    },
    labelledPrice : {
        type : Number,
        required : true,
    },
    price : {
        type : Number,
        required : true
    },
    images : {
        type : [String],
        default : ["/default-product.jpg"]
    },
    description : {
        type : String,
        required : true
    },
    stock : {
        type : String,
        required : true,
        default : 0
    },
    isAvailable : {
        type : Boolean,
        default : true
    },
    category : {
        type : String,
        required : true,
        default : "cosmetics"
    },
})

const product = mongoose.model("product", productSchema);

export default product;
