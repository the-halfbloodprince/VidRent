const Joi = require('joi')
const mongoose = require('mongoose')
const {Customer, validateCustomer} = require('../models/customer')

//getCustomers
async function getCustomers(req,res) {
    Customer.find().sort('name').then(customer=>res.send(customers))
                                .catch(err=>res.status(500).send("Couldn't get the list of customers"))
}


//getCustomer
async function getCustomer(req, res){
    Customer.findById(req.params.id).then(customer=>res.send(customers))
                                    .catch(err=>res.status(404).send("Customer with the given ID not found..."))
}


//postCustomer
async function postCustomer(req,res){
    const {error} = validateCustomer(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })

    customer.save().then(customer=>res.send(customers))
                                         .catch(err=>res.status(500).send("Couldn't save the customer"))
}


//putCustomer
async function putCustomer(req, res) {
    const {error} = validateCustomer(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone
    }, {
        new: true
    }).then(customer=>res.send(customer))
        .catch(err=>res.status(404).send('Customer with the given ID not found...'))
}


//delCustomer
async function delCustomer(req, res) {
    Customer.findByIdAndDelete(req.params.id).then(customer=>res.send(customer))
                                                .catch(err=>res.status(404).send('Customer with the given ID not found...'))
    }

module.exports.getCustomers = getCustomers
module.exports.getCustomer = getCustomer
module.exports.postCustomer = postCustomer
module.exports.putCustomer = putCustomer
module.exports.delCustomer = delCustomer