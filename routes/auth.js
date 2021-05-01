const express = require('express')
const router = express.Router()
const { authUser } = require('../controllers/authOperations')

//routes
router.post('/', authUser)

module.exports = router