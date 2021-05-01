const express = require('express')
const router = express.Router()
const {getMovies, getMovie, postMovies, putMovies, deleteMovies} = require('../controllers/moviesOperations')

//routes
router.get('/', getMovies)
router.get('/:id', getMovie)
router.post('/', postMovies)
router.put('/:id', putMovies)
router.delete('/:id', deleteMovies)

module.exports = router