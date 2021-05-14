const express = require("express");
const bcrypt = require('bcryptjs');
const loginRouter = express.Router();
const credData = require('../model/credentialData');

function lRouter(nav, redirectHome){
    loginRouter.get('/', redirectHome, function(req,res){
        res.render('login',{
            nav,
            title: 'Login'
        });
    });

    loginRouter.post('/auth', redirectHome, function(req,res){
        var mail= req.body.email;
        var pwd= req.body.password;
        credData.findOne({email: mail})
        .then(function (credential){
            if(bcrypt.compareSync(pwd, credential.password)){
                req.session.userId = credential._id;
                res.redirect('/books');
            }
            else{
                alert("Error: Wrong username/password!");
                res.redirect('/login');
            }
        }); 
    });
    
    return loginRouter;
};

module.exports = lRouter;