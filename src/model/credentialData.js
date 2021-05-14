const mongoose = require('mongoose');

mongoose.connect('database_connection_link');

const Schema = mongoose.Schema;

const credSchema = new Schema({
    email: String,
    phone: String,
    password: String,
});

var credData = mongoose.model('credData',credSchema); 

//Exporting data
module.exports = credData;