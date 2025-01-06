const express= require('express');
const Product = require('../models/Product');
const Review = require("../models/Review"); 
const router = express.Router();
const {validateReview } = require('../Middleware');



router.post('/products/:id/review' , validateReview,async(req,res)=>{

    try{
        let {id} = req.params;
    let {rating,comment} = req.body;

    const product = await Product.findById(id);
    const review= new Review({rating,comment});

    product.reviews.push(review);
    await product.save();
    await review.save();
    req.flash('success', 'Review submitted successfully');

    res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error' , {err: e.message});
    }
    


})

















module.exports=router;