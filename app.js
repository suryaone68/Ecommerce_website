const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsmate  = require('ejs-mate');
const methodOverride = require('method-override');
const ProductRoutes = require('./Routes/product');
const reviewRoutes = require('./Routes/review');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const flash = require('connect-flash');
const session = require('express-session')
const authRoutes = require('./Routes/auth');
const exp = require('constants');
const cartRoutes = require('./Routes/cart');





//seedDB() is used to seed data into the database. It should be commented out when deploying the app to avoid data loss.





mongoose.connect('mongodb://127.0.0.1:27017/E-Commerce_DateBase')
.then(()=>{
    console.log("DB Connected Successfully")
})
.catch((err)=>{
    console.log("DB error");
    confirm.log(err);
})

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 24*7*60*60*1000,
        maxAge: 24*7*60*60*1000
    }
}


app.engine('ejs' , ejsmate);
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session(configSession));
app.use(flash());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());




app.use((req,res,next)=>{
    res.locals.currentUser = req.user;  //currentUser is used in the layout.ejs file to display the username in the navbar.
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



//PassPort

passport.use(new LocalStrategy(User.authenticate()));



 


app.use(ProductRoutes);//run for all upcoming requests;
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);










app.listen(8080 ,()=>{
    console.log('Server is running on port 8080');
})