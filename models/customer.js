const Joi = require('joi')
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 13
    }
})

const Customer = mongoose.model('Customer', customerSchema)

function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.String().min(5).max(50).required(),
        phone: Joi.String().min(10).max(13).required(),
        isGold: Joi.boolean()
    })

    return Joi.validate(customer, schema)
}

exports.Customer = Customer
exports.validateCustomer = validateCustomer