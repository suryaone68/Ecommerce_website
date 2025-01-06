const express= require('express');
const Product = require('../models/Product');
const router = express.Router();
const {validateProduct, isLoggedIn, isSeller, isProductAuthor} = require('../Middleware');


// main route

router.get('/products', isLoggedIn ,async(req,res)=>{
    try{
        let products=await Product.find({});
        res.render('products/index',{products});
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
   
})

//to render the form for creating a new product  - GET request

router.get('/products/new', isLoggedIn ,(req,res)=>{
    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
    
})

//to actually add the product

router.post('/products' ,isLoggedIn , validateProduct , isSeller, async(req,res)=>{
    try{
        let {name ,  img , price , description}= req.body;
    await Product.create({name, img, price, description,author:req.user._id});
    req.flash('success' ,'Product Added Successfully');
    res.redirect('/products');
    }
   catch(e){
    res.status(500).render('error' , {err:e.message});

   }
}) 


//to show the product...
router.get('/products/:id' , isLoggedIn ,async(req,res)=>{
    try{
        let {id}= req.params;
    let foundProduct = await Product.findById(id).populate('reviews');
    res.render('products/show',{foundProduct , msg:req.flash('success_msg')});
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    
    }
    
})

//to edit the product...

router.get('/products/:id/edit',isLoggedIn , isSeller,async(req,res)=>{
    try{
        let {id}= req.params;
    let foundProduct = await Product.findById(id);
    res.render('products/edit',{foundProduct});
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    
    }
    
})

//to actually edit the data in db

router.patch('/products/:id' , isLoggedIn ,validateProduct, async (req,res)=>{
    try{
        let {id}= req.params;
    let {name, img, price, description } = req.body;
    await Product.findByIdAndUpdate(id , {name, img, price, description });
    req.flash('success' ,'Product Edited Successfully');
    res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    
    }
    
})

//to delete the product...

router.delete('/products/:id',isLoggedIn ,isProductAuthor, async(req,res)=>{
    try
    {
        let {id}= req.params;
        const product  = await Product.findById(id);
        await Product.findByIdAndDelete(id);
        req.flash('success' ,'Product Deleted Successfully');

        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    
    }

})

module.exports = router;