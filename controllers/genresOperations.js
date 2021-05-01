//dependencies
const Joi = require('joi')
const mongoose = require('mongoose')
const {Genre, validate} = require('../models/genre')


//getGenres
async function getGenres(req,res,next) {

    //get the genres
    Genre
        .find()
        .sort('name')
        .then(genres=>res.send(genres))
        .catch(err => next(err))
}


//postGenres
async function postGenres(req,res,next) {

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let genre = new Genre({
        name: req.body.name
    })

    genre
        .save()
        .then((g)=>res.send(g))
        .catch(err => next(err))
}


//postGenres
async function putGenres(req,res,next) {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    Genre
        .findByIdAndUpdate(req.params.id,{
            name: req.body.name
        },{
            new: true
        })
        
        .then( genre => res.send(genre) )
        .catch( err => next(err) )
}



//deleteGenres
async function deleteGenres(req,res,next) {

    Genre
        .findByIdAndDelete(req.params.id)
        .then( genre => res.send(genre) )
        .catch( err => next(err))
}

//Check this and implement it elsewhere too
async function getGenre(req,res,next) {

    Genre
        .findById(req.params.id)
        .then( genre =>res.send(genre) )
        .catch( err => next(err) )

    // res.send(genre)
}

module.exports.getGenres = getGenres
module.exports.getGenre = getGenre
module.exports.postGenres = postGenres
module.exports.putGenres = putGenres
module.exports.deleteGenres = deleteGenres