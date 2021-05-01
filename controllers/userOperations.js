const {User, validate} = require('../models/user')
const _ = require('lodash')
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
const bcrypt = require('bcrypt')

async function getUser(req, res, next){

    User
        .findById(req.user._id).select('-password')
        .then(user => res.send(user))
        .catch(err => res.status(404).send('user with the given ID not found'))
}

async function postUser(req, res, next){

    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const { error2 } = passwordComplexity({
        min: 8,
        max: 26,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4
    }).validate(req.body.password)
    if(error2) return res.status(400).send(error2.details[0].message)

    /* let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('User already registered')

    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    const token = user.generateAuthToken()
    

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email'])) */

    User
        .findOne({email: req.body.email})
        .then(user => {return res.status(400).send('User already registered')})
        .catch(err => {

            user = new User(_.pick(req.body, ['name', 'email', 'password']))

            bcrypt.genSalt(10)
                .then(salt => {
                        bcrypt.hash(user.password, salt)
                                .then(hashed => {
                                        user.password = hashed
                                        user.save()
                                    })
                                .catch(err => next(err))})
                
                .catch(err => next(err))})
                
        

}

module.exports.postUser = postUser
module.exports.getUser = getUser