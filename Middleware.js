const {productSchema , reviewSchema} = require('./joiSchema')
const Product = require('./models/Product');
const validateProduct =  (req,res,next)=>{

    const {name,img,description,price} = req.body;

    const {error} =  productSchema.validate({name,img,description,price});
    if(error) {
        return res.render('error')
    }
    next();
}

const validateReview = (req,res,next)=>{

    const {rating,comment} = req.body;

    const {error} = reviewSchema.validate({rating,comment});
    if(error) {
        return res.render('error')
    }
    next();
}

const isLoggedIn  = (req,res,next) =>{
    if(!req.isAuthenticated()){
        
        req.flash('error','You must be logged in to do that');
        return res.redirect('/login');
    }
    next();
   
}

const isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error','You must be a seller to do that');
        return res.redirect('/products');
    }
    else if(req.user.role !== 'seller'){
        req.flash('error','You are not a seller');
        return res.redirect('/products');
    }
    next();
}

const isProductAuthor = async(req,res,next)=>{

    const {id} = req.params;
    let product = await Product.findById(id);
    
    if(!product.author.equals(req.user._id)){
        req.flash('error','You are not the Authorised user');
        return res.redirect('/products');
    }
    next();
}




module.exports = {validateReview,validateProduct,isLoggedIn,isSeller,isProductAuthor};
