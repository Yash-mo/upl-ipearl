const {Checkout} = require('./PaymentController')
const express = require('express')
const router = express.Router()
router.post('/checkout', Checkout)


module.exports = router