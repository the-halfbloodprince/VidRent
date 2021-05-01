const express = require('express')
const router = express.Router()
const { postUser, getUser } = require('../controllers/userOperations')
const auth = require('../middleware/auth')

//routes
router.get('/me', auth, getUser)
router.post('/', postUser)

module.exports = router