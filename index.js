//dependencies
const express = require('express')
const winston = require('winston')

//Logging
require('./startup/logging')()

//Database initialisation
require('./startup/db')()

//Routes
require('./startup/routes')(app)

//Configuring
require('./startup/config')()

//Validation
require('./startup/validation')()

//start the app
const app = express()

//middleware to parse json
app.use(express.json())

//listen
const port = process.env.PORT || 3000
app.listen(port, () => winston.info(`server up and running at port ${port}...`))