const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next){
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('ACCESS DENIED. NO AUTH-TOKEN FOUND')

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = decoded
        console.log(req.user)
        next()
    } 
    catch (err) {
        console.log(err)
        res.status(400).send('Token is invalid')
    }
}