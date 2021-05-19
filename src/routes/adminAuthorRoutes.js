const express = require('express');
const adminAuthorRouter = express.Router();
const AuthorData = require('../model/Authordata');

function router(nav){
    adminAuthorRouter.get('/',function(req,res){
        res.render('newauthor',{
            nav,
            title: 'Add New Author'
        })
    })
     
    
    adminAuthorRouter.post('/add',function(req,res){
        var item = {
            name : req.body.name,
            description : req.body.description,
            genre : req.body.genre,
            about : req.body.about,
            image : req.body.image
        }
        var author = AuthorData(item);
        author.save();//save into database
        res.redirect('/authors');
    });

    adminAuthorRouter.post('/update/:id',async(req,res)=>{
        const id = req.params.id; 
        let author  = await AuthorData.findOne({_id:id});
        author.name =  req.body.name;
        author.description =  req.body.description;
        author.genre = req.body.genre;
        author.about =  req.body.about;
        author.image = req.body.image;
        author = await author.save();
        console.log(id);
        res.redirect('/authors');
    });

    return adminAuthorRouter;
}
module.exports = router;