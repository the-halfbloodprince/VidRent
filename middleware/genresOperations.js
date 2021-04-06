//dependencies
const Joi = require('joi')
const mongoose = require('mongoose')
const {Genre, validate} = require('../models/genre')


//getGenres
async function getGenres(req,res) {

    //get the genres
    Genre.find().sort('name').then(genres=>res.send(genres))
                                .catch(err=>res.status(500).send('Error querying the databse'))
}


//postGenres
async function postGenres(req,res) {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    let genre = new Genre({
        name: req.body.name
    })

    genre.save().then((g)=>res.send(g))
                .catch((err)=>res.status(500).send("Couldn't save the course."))
}


//postGenres
async function putGenres(req,res) {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    Genre.findByIdAndUpdate(req.params.id,{
        name: req.body.name
    },{
        new: true
    }).then((genre)=>res.send(genre))
        .catch((err)=>res.status(404).send('Genre with the given ID was not found'))
}



//deleteGenres
async function deleteGenres(req,res) {

    Genre.findByIdAndDelete(req.params.id).then(genre=>res.send(genre))
                                            .catch(err=>res.status(404).send('Genre with the given ID was not found'))
}

//Check this and implement it elsewhere too
async function getGenre(req,res) {
    Genre.findById(req.params.id).then((genre)=>res.send(genre))
                                .catch((err)=>{
                                    res.status(404).send('Not found')
                                })

    // res.send(genre)
}

module.exports.getGenres = getGenres
module.exports.getGenre = getGenre
module.exports.postGenres = postGenres
module.exports.putGenres = putGenres
module.exports.deleteGenres = deleteGenres