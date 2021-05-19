const express = require('express');
const adminbookRouter = express.Router();
const Bookdata = require('../model/Bookdata');

function router(nav){ 
    adminbookRouter.get('/',function(req,res){
        res.render('newbook',{
            nav,
            title: 'Add New Book'
        })
    })
    
    
    adminbookRouter.post('/add',function(req,res){
        var item = {
            title : req.body.title,
            author : req.body.author,
            genre : req.body.genre,
            summary : req.body.summary,
            image : req.body.image
        }
        var book = Bookdata(item); 
        book.save();//save into database
        res.redirect('/books');
    }); 

    adminbookRouter.post('/update/:id',async(req,res)=>{
        const id = req.params.id; 
        let book  = await Bookdata.findOne({_id:id});
        book.title =  req.body.title;
        book.author =  req.body.author;
        book.genre = req.body.genre;
        book.summary =  req.body.summary;
        book.image = req.body.image;
        book = await book.save();
        console.log(id);
        res.redirect('/books');
    });

    return adminbookRouter;
}
module.exports = router;