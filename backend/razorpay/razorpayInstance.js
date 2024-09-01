    const razorpay = require('razorpay')
    const dotenv = require('dotenv')

    dotenv.config({ path: './config/config.env' })

const instance = new razorpay({
    key_id: "dsv",
    key_secret: "sbfsb"
})
module.exports = { instance }