const Joi = require('joi')
const {User} = require('../models/user')
const _ = require('lodash')
const passwordComplexity = require('joi-password-complexity')
const bcrypt = require('bcrypt')

async function authUser(req, res){

    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Invalid email or password')

    const validPassword = bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid email or password')

    const token = user.generateAuthToken()

    res.send(token)
}

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(user)
}

module.exports.authUser = authUser