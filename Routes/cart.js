const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {isLoggedIn} = require('../Middleware');
const product = require('../models/Product');


//route to see the product
router.get('/user/cart',isLoggedIn,async (req,res)=>{

    const user = await User.findById(req.user._id).populate('cart');
   
    res.render('cart/cart',{user})
})



//actually adding to product to the cart

router.post('/user/:productId/add',isLoggedIn,async (req,res)=>{
    let {productId} = req.params;
    let userId = req.user._id;
    let Product = await product.findById(productId);
    let user = await User.findById(userId);
    
    user.cart.push(Product);
    await user.save();
    res.redirect('/user/cart');

});



module.exports = router;