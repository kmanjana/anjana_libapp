const express = require("express");
const app = express();
const nav = [ 
    {link : '/books' , name : 'Books'},
    {link : '/authors' , name : 'Authors'},
    {link : '/signup' , name : 'Sign Up'},
    {link : '/login' , name : 'Login'},
    {link : '/admin_book' , name : 'Add New Book'},
    {link : '/admin_author' , name : 'Add New Author'}
]

const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorsRouter = require('./src/routes/authorRoutes')(nav);
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