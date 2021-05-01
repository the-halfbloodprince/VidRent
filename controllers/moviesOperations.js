//dependencies
const Joi = require('joi')
const mongoose = require('mongoose')
const {Movie, validate} = require('../models/movie')
const {Genre} = require('../models/genre')


//getMovies
async function getMovies(req,res,next) {
    
    //get the Movies
    Movie
    .find()
    .sort('name')
    .then((movies)=>res.send(movies))
    .catch(err => next(err))
}

async function getMovie(req,res) {

    Movie
        .findById(req.params.id)
        .then((movie)=>res.send(movie))
        .catch( err => res.status(404).send('Not found') )
}

//postMovies
async function postMovies(req,res,next) {

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    Genre
        .findById(req.body.genreId)
        .then((genre)=>{
                let movie = new Movie({
                    title: req.body.title,
                    genre: {
                        _id: genre._id,
                        name: genre.name
                    },
                    numberInStock: req.body.numberInStock,
                    dailyRentalRate: req.body.dailyRentalRate
                })
    
            movie
                .save()
                .then((movie)=>res.send(movie))
                .catch(err => next(err))
        })
        .catch((err)=>res.status(400).send('Invalid genre'))
    
}


//putMovies
async function putMovies(req,res,next) {

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    Movie
        .findByIdAndUpdate(req.params.id,{
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    name: genre.name
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            },{
                new: true
            })
        .then((movie)=>res.send(movie))
        .catch(err => next(err))
    }



//deleteMovies
async function deleteMovies(req,res,next) {

    Movie
        .findByIdAndDelete(req.params.id)
        .then((movie)=>res.send(movie))
        .catch(err => next(err))
    }

module.exports.getMovies = getMovies
module.exports.getMovie = getMovie
module.exports.postMovies = postMovies
module.exports.putMovies = putMovies
module.exports.deleteMovies = deleteMovies