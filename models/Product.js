const mongoose = require("mongoose");
const Review = require("./Review");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        // minlength: 3,
        // maxlength: 50
    },
    img:{
        type: String,
        required: true,
        trim:true
    },
    description: {
        type: String,
        required: true,
        trim:true
        // minlength: 10,
        // maxlength: 200
    },
    price: {
        type: Number,
        required: true,
        // min: 0
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ] ,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

//Middleware

productSchema.post('findOneAndDelete' , async function(product){
    if(product.reviews.length>0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})
  



let Product = mongoose.model('Product', productSchema);
module.exports = Product;

