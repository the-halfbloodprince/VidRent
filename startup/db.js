//Dependencies
const mongoose = require('mongoose')
const winston = require('winston/lib/winston/config')

require('winston')

module.exports = function(){
    //Connect to the database
    mongoose.connect('mongodb://localhost/vidlee',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(()=> winston.info('Connected to MongoDB...'))
}