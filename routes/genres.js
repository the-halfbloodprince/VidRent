const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const {getGenres, getGenre, postGenres, putGenres, deleteGenres} = require('../controllers/genresOperations')

//routes
router.get('/', getGenres)
router.get('/:id', getGenre)
router.post('/', auth, postGenres)
router.put('/:id', putGenres)
router.delete('/:id', [auth, admin], deleteGenres)

module.exports = router