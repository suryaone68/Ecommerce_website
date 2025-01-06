//Schema for Server Side Validation


// const  name  = require('ejs');
const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    img: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required().min(0),
    

    
});

const reviewSchema = Joi.object({
    rating: Joi.string().min(0).max(5).required(),
    comment: Joi.string().required(),
   
})

module.exports = { productSchema, reviewSchema };