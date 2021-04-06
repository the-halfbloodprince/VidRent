const express = require('express')
const router = express.Router()
const {getGenres, getGenre, postGenres, putGenres, deleteGenres} = require('../middleware/genresOperations')

//routes
router.get('/', getGenres)
router.get('/:id', getGenre)
router.post('/', postGenres)
router.put('/:id', putGenres)
router.delete('/:id', deleteGenres)

module.exports = router