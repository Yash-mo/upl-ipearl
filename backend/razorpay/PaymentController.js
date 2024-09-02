const Razorpay = require("razorpay");
const { instance } = require("./razorpayInstance.js");
const { create } = require("../product/productmodel.js");
const receipt = require('./ReceiptModel')

class paymentcontroller {

    async Checkout(req, res) {
        console.log("we are 1")
        const data = req.body
        console.log("we are in checkout")

        var options = {
            amount: data.totalprice,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "iphone"
        };

        const order = await instance.orders.create(options)
        console.log("order given")
        res.status(200).json({
            success: true,
        })

    }

    async Paymentverify(req, res) {
        console.log("1")
        const { razorpay_payment_id, orderId, razorpayOrderId, signature } = req.body
        console.log(req.body)
        
        // no need for this instance 
        // var instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_API_SECRET })
        
        const secret = process.env.RAZORPAY_API_SECRET
        console.log("2")
        
        
        var { validatePaymentVerification, validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
        
        const isvalid = validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpay_payment_id }, signature, secret);
        console.log(isvalid)
        
        
        if (isvalid) {
            const dbreceipt = await receipt.create(req.body)
            res.status(200).send({ message: true, RefrenceNo: orderId })
        } else {
            return res.status(500).send({ message: "error" })
        }
    }
}

const PaymentController = new paymentcontroller()
module.exports = PaymentController 