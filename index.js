//dependencies

const mongoose = require('mongoose')
const Joi = require('joi')
const express = require('express')
const genres = require('./routes/genres')
const home = require('./routes/home')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')

//start the app
const app = express()

//Connect to the database
mongoose.connect('mongodb://localhost/vidlee',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(()=>console.error("Couldn't connect to mongoDB..."))

app.set('view engine', 'pug')
app.set('views', './views')

//middleware to parse json
app.use(express.json())

app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/', home)

//listen
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server up and running at port ${port}...`))