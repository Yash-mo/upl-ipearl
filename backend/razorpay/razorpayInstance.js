const razorpay = require('razorpay')
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' })

const instance = new razorpay({
    key_id: "rzp_test_UaCwo8g8zgeK1J",
    key_secret: "9Z9nsnOoWxrHH38Bf8g4tobA",
})
module.exports = { instance }