const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');



// to show the form for signup

router.get('/register' , (req,res)=>{
  res.render('auth/signup');
})


// to actually want to register a user in my DB

router.post('/register', async(req,res)=>{
  try{
    let {email,password,username,role } = req.body;
    const user =   new User({email,username,role})
    const newUser =  await User.register(user,password );
    req.login(newUser , function(err){
      if(err){return next(err)}
      req.flash('success' ,'Welcome to the Market Mate, '+ newUser.username);
      return res.redirect('/products');
    })
  }
  catch(e){
    req.flash('error',e.message);
    res.redirect('/register');
  }
  
  
});


// to show the form for login


router.get('/login' , (req,res)=>{
  res.render('auth/login');
})





// to actually login via DB

router.post('/login', passport.authenticate('local', { 
  failureRedirect: '/login',
  failureMessage: true

 }),
  function(req, res) {
    req.flash('success','Welcome Back!')
    res.redirect('/products');
  });




//Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    req.flash('success','Thank You! Visit again')
    res.redirect('/login');
  });
});


module.exports = router;