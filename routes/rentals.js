const express = require('express')
const router = express.Router()
const {getRentals, getRental, postRental, putRental, delRental} = require('../controllers/rentalsOperations')

router.get('/',getRentals)
router.get('/:id',getRental)
router.post('/',postRental)
router.put('/:id',putRental)
router.delete('/:id',delRental)

module.exports = router