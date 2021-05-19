const express = require("express");
const app = express();
const session = require('express-session');
const  mongoose = require('mongoose')
const MongoDBSession = require('connect-mongodb-session')(session);
const bcrypt = require('bcryptjs');
const UserModel = require('./src/model/Userdata');
// const mongoURI='mongodb://localhost:27017/library'
const mongoURI='mongodb+srv://userone:userone@ictakfiles.zmywv.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority';

mongoose.connect(mongoURI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
})

.then((res) =>{
    console.log("mongodb connected");
});

const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'mySessions',
});
// const isAuth= (req,res,next)=>{
//     if(req.session!=undefined){
//         next()

//     }
//     else{
//         res.redirect('/login');
//     }
// }

const nav = [ 
    {link : '/books' , name : 'Books'},
    {link : '/authors' , name : 'Authors'},
    {link : '/admin_book' , name : 'Add New Book'},
    {link : '/admin_author' , name : 'Add New Author'},
    {link : '/logout' , name : 'Logout'},
]

const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorsRouter = require('./src/routes/authorRoutes')(nav,);
const adminbookRouter = require('./src/routes/adminbookRoutes')(nav);
const adminAuthorRouter = require('./src/routes/adminAuthorRoutes')(nav);

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine' , 'ejs');
app.set('views' , __dirname+'/src/views');
app.use('/books' , booksRouter);
app.use('/admin_book',adminbookRouter);
app.use('/authors' , authorsRouter);
app.use('/admin_author',adminAuthorRouter);

app.use(session({

    secret: 'key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: store,
    
  
}));

app.get('/' , (req,res)=>{
    // req.session.isAuth = true;
    res.render("signup" , 
        {
        title : 'Library',
        successsignup:''
        });
})

app.get('/index' , (req,res)=>{
    res.render("index" , 
        {nav,
        title : 'Library',
        });
})

app.post("/signup",async(req,res)=>{
    var mail = req.body.email.trim();
    let user = await UserModel.findOne({email : mail});
    if(user){
         
        
        res.render('signup' , {
            title: 'Signup',
            successsignup:'Email already exists'
        });  //redirect to signup page
    
    }
     if (user===null){
         var password = req.body.paswd;
        const hashedPsw = await bcrypt.hash(password,12);

        var item = {
            fname : req.body.fname.trim(),
            lname : req.body.lname.trim(),
            email : req.body.email.trim(),
            phno : req.body.phno.trim(),
            username : req.body.username.trim(),
            paswd : hashedPsw
        }
        user = UserModel(item); 
        await user.save();
    
        res.redirect('/login');
    }
    
   
});
app.get('/login' , (req,res)=>{

    res.render("login" , 
        {
        title : 'Library',
        successlog:''
        });
})

app.post("/login",async(req,res)=>{
    const { logemail, logpaswd} = req.body;

    UserModel.findOne({email: logemail})
    .then(function (user){
        if(bcrypt.compareSync(logpaswd, user.paswd)){
            req.session.isAuth =true;
            res.redirect('/index');
        }
        else{
            res.render('login' , {
                title: 'Login',
                successlog:'Invalid email or password'
            });
        }
    })
    .catch(function(){
        res.render('login' , {
            title: 'Login',
            successlog:'Email do not exist'
        });
    })
    
   
});
app.get('/logout' , function(req,res){
    req.session.destroy((err)=>{
        if(err)throw err;
        res.redirect('/login');

    })
       
    })

app.listen(port,()=>{console.log("Server Ready at "+port)});
