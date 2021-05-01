//Package Dependencies
import express from 'express'

//Importing Routes
import home from '../routes/home'
import genres from '../routes/genres'
import customers from '../routes/customers'
import movies from '../routes/movies'
import rentals from '../routes/rentals'
import users from '../routes/users'
import auth from '../routes/auth'

//Middleware
const error = require('./middleware/error')

module.exports = function(app) {

    //Setting the view engine
    app.set('view engine', 'pug')
    app.set('views', './views') 

    //Routes
    app.use('/', home)
    app.use('/api/genres', genres)
    app.use('/api/customers', customers)
    app.use('/api/movies', movies)
    app.use('/api/rentals', rentals)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use(error)
}