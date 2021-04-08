const Joi = require('joi')
const mongoose = require('mongoose')

const Rental = mongoose.model('Rental', {
    customer: {
        type: new mongoose.Schema({
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
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title:{
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                default: 100,
                min: 0,
                max: 1000
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})

function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    })
}

module.exports = {
    Rental: Rental,
    validate: validateRental
}