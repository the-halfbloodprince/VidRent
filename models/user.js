//dependencies
const Joi = require('joi')
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')

//genres
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
        _id: this.id,
        isAdmin: this.isAdmin
    }, config.get('jwtPrivateKey'))

    return token
}

const User = mongoose.model('User', userSchema)


//old implementation
/* const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Comedy'},
    {id: 3, name: 'Horror'},
    {id: 4, name: 'Romance'}
] */

//genre validation logic
function validate(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(user)
}

exports.User = User
exports.validate = validate