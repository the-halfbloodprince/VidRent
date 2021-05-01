const winston = require('winston')

module.exports = function (err, req, res, next) {

    winston.error(err.message, err)
    res.status(500).send('There was a problem on the server side')
}