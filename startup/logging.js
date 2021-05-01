//Dependencies
const winston = require('winston')
require('winston-mongodb')

module.exports = function(){
    //Configuring winston
    winston.add(winston.transports.File, { filename: 'logfile.log'})
    winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidlee", level: "warn" })

    // process.on('uncaughtException',ex => {
    //     winston.error(ex.message, ex)
    //     process.exit(1)
    // })

    // process.on('unhandledRejection',ex => {
    //     winston.error(ex.message, ex)
    //     process.exit(1)
    // })

    winston.exceptions.handle( new winston.transports.Console({ colorize: true, prettyPrint: true }), new winston.transports.File({ filename: 'uncaughtExceptions.log' }) )
    winston.rejections.handle( new winston.transports.Console({ colorize: true, prettyPrint: true }), new winston.transports.File({ filename: 'uncaughtRejections.log' }) )
}