const express = require('express')
const router = express.Router()
const { getCustomers, getCustomer, postCustomer, putCustomer, delCustomer} = require('../middleware/customersOperations')

router.get('/', getCustomers)
router.get('/:id', getCustomer)
router.post('/', postCustomer)
router.put('/:id', putCustomer)
router.delete('/:id', delCustomer)

module.exports = router