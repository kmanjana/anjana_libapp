const express = require("express");
const app = express();
var session = require('express-session')


const sessTime= 2*60*60*1000;
const {
    PORT=3000,
    NODE_ENV = 'development',
    SESS_NAME='sid',
    SESS_SECRET= 'ssh!quiet,it\'asecret!',
    SESS_LIFETIME= sessTime
} = process.env;




const nav = [ 
    {link : '/books' , name : 'Books'},
    {link : '/authors' , name : 'Authors'},
    {link : '/signup' , name : 'Sign Up'},
    {link : '/login' , name : 'Login'},
    {link : '/admin_book' , name : 'Add New Book'},
    {link : '/admin_author' , name : 'Add New Author'}
]


const redirectLogin = (req, res, next) =>{
    if(!req.session.userId){
        res.redirect('/login');
    }
    else{
        next()
    }
}

const redirectHome = (req, res, next) =>{
    if(req.session.userId){
        res.redirect('/');
    }
    else{
        next()
    }
}


const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorsRouter = require('./src/routes/authorRoutes')(nav);
const adminbookRouter = require('./src/routes/adminbookRoutes')(nav);
const adminAuthorRouter = require('./src/routes/adminAuthorRoutes')(nav);
const loginRouter = require('./src/routes/loginRoutes')(nav,redirectHome);
const signupRouter = require('./src/routes/signupRoutes')(nav,redirectHome);
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie:{
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}));
app.set('view engine' , 'ejs');
app.set('views' , __dirname+'/src/views');
app.use('/books' , booksRouter);
app.use('/admin_book',adminbookRouter);
app.use('/authors' , authorsRouter);
app.use('/admin_author',adminAuthorRouter);
app.use('/login',loginRouter);
app.use('/signup',signupRouter);

app.get('/' , function(req,res){
    res.render("index" , 
        {nav,
        title : 'Library'
        });
})

app.get('/signup' , function(req,res){
    res.render("signup" , 
        {nav,
        title : 'Library'
        });
})

app.get('/login' , function(req,res){
    res.render("login" , 
        {nav,
        title : 'Library'
        });
})

app.listen(port,()=>{console.log("Server Ready at "+port)});