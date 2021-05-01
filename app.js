const express = require("express");
const app = express();
const nav = [ 
    {link : '/books' , name : 'Books'},
    {link : '/authors' , name : 'Authors'},
    {link : '/signup' , name : 'Sign Up'},
    {link : '/login' , name : 'Login'},
    {link : '/newbook' , name : 'Add New Book'},
    {link : '/newauthor' , name : 'Add New Author'}
]

const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorsRouter = require('./src/routes/authorRoutes')(nav);
const port = process.env.PORT || 5000;

app.use(express.static('./public'));
app.set('view engine' , 'ejs');
app.set('views' , __dirname+'/src/views');
app.use('/books' , booksRouter);
app.use('/authors' , authorsRouter);

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

app.get('/newbook' , function(req,res){
    res.render("newbook" , 
        {nav,
        title : 'Library'
        });
})

app.get('/newauthor' , function(req,res){
    res.render("newauthor" , 
        {nav,
        title : 'Library'
        });
})


app.listen(port,()=>{console.log("Server Ready at "+port)});