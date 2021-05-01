const Joi = require('joi')
const mongoose = require('mongoose')
const {Customer, validateCustomer} = require('../models/customer')

//getCustomers
async function getCustomers(req,res,next) {

    Customer

        .find()
        .sort('name')

        .then(customer=>res.send(customers))
        .catch(err => next(err))
}


//getCustomer
async function getCustomer(req, res,next){

    Customer
        .findById(req.params.id)
        .then(customer=>res.send(customers))
        .catch(err => next(err))
}


//postCustomer
async function postCustomer(req,res,next){

    const {error} = validateCustomer(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })

    customer
        .save()
        .then(customer=>res.send(customers))
        .catch(err => next(err))
}


//putCustomer
async function putCustomer(req, res, next) {

    const {error} = validateCustomer(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    Customer
            .findByIdAndUpdate(req.params.id, {
                                                name: req.body.name,
                                                phone: req.body.phone
                                            }, {
                                                new: true
                                            })
            .then(customer=>res.send(customer))
            .catch(err => next(err))
}


//delCustomer
async function delCustomer(req, res, next) {

    Customer
            .findByIdAndDelete(req.params.id)
            .then(customer=>res.send(customer))
            .catch(err => next(err))
    }

module.exports.getCustomers = getCustomers
module.exports.getCustomer = getCustomer
module.exports.postCustomer = postCustomer
module.exports.putCustomer = putCustomer
module.exports.delCustomer = delCustomer