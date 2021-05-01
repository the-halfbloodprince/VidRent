//dependencies
const Joi = require('joi')
const mongoose = require('mongoose')
const Fawn = require('fawn')
const {Rental, validate} = require('../models/rental')
const {Customer} = require('../models/customer')
const {Movie} = require('../models/movie')

Fawn.init(mongoose)

async function getRentals(req,res,next){

    Rental
        .find()
        .sort('name')
        .then(rental => res.send(rental))
        .catch(err => next(err))
    }

async function getRental(req,res,next){

    Rental
        .findById(req.params.id)
        .then(rental => res.send(rental))
        .catch(err => res.status(404).send("Couldn't find any rental with the given id"))
}

async function postRental(req,res,next){

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    Customer
            .findById(req.body.customerId)
            .then(customer => 
                {
                    Movie.findById(req.body.movieId)
                        .then(movie => {
                            if (movie.numberInStock===0) return res.send('Out of Stock')
                            
                            let rental = new Rental({
                                customer: {
                                    _id: customer._id,
                                    name: customer.name
                                },
                                movie: {
                                    _id: movie._id,
                                    title: movie.title,
                                    dailyRentalRate: movie.dailyRentalRate
                                }
                            })

                        /* rental.save()
                                .then((rental)=>{
                                    movie.numberInStock--
                                    movie.save()
                                            .then(movie => res.send(rental))
                                            .catch(err => res.status(500).send("Couldn't save the rental. Please try again."))
                                })
                                .catch(err => res.status(500).send("Couldn't save the rental. Please try again.")) */

                        new Fawn.Task()
                                    .save('rentals', rental)
                                    .update('movies', {_id: movie._id}, { $inc: {numberInStock: -1} })
                                    .run()
                                    .then(()=>res.send(rental))
                                    .catch(err => next(err))
                    })
                    .catch(err => res.status(404).send("Movie not found."))
            })
            .catch(err => res.status(404).send("Customer not found."))
    }

async function putRental(req,res,next){

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    Rental
        .findByIdAndUpdate(req.params.id,{
                customer: {
                    _id: customer._id,
                    name: customer.name
                },
                movie: {
                    _id: movie._id,
                    title: movie.title,
                    dailyRentalRate: movie.dailyRentalRate
                }
            },{
                new: true
            })
        .then((rental)=>res.send(rental))
        .catch((err)=>res.status(404).send('Rental with the given ID was not found'))
}

async function delRental(req,res,next){
    
    Rental.findByIdAndDelete(req.params.id)
                .then((rental)=>res.send(rental))
                .catch((err)=>res.status(404).send('Rental with the given ID was not found'))
}

module.exports = {
    getRentals: getRentals,
    getRental: getRental,
    postRental: postRental,
    putRental: putRental,
    delRental: delRental
}
