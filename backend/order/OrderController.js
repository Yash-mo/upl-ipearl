const orderModel = require("./OrderModel")
const { instance } = require('../razorpay/razorpayInstance.js')
class OrderController {
    async createOrder(req, res) {
        try {
            const { products, user, paymentMethod, shippingAddress, totalPrice } = req.body

            if (!products || products.lenght <= 0) {
                return res.status(400).send({ message: "Misssing dependecy Product" })
            }
            if (!user) {
                return res.status(400).send({ message: "Misssing dependecy user" })
            }
            if (!paymentMethod) {
                return res.status(400).send({ message: "Misssing dependecy paymentMethod" })
            }

            if (!shippingAddress) {
                return res.status(400).send({ message: "Misssing dependecy shippingAddress" })
            }

            const deliveryDate = new Date()
            deliveryDate.setDate(deliveryDate.getDate() + 4)

            const orderDetails = {
                products,
                user,
                paymentMethod,
                shippingAddress,
                deliverdIn: deliveryDate,
                totalPrice
            }

            let orderdone = await orderModel.create(orderDetails)
            orderdone = { ...orderdone._doc, RazorpayDetails: null }

            if (paymentMethod === "cod") {
                if (!orderdone) return res.status(500).send({ message: "something went wrong" })
                return res.status(200).send({ message: "success", orderdone })
            }
            else {

                const options = {

                    amount: totalPrice * 100,
                    currency: "USD",
                    receipt: "rcpt_id_" + orderdone._id
                }
                const Razorpayresult = await instance.orders.create(options)
                
                if (!Razorpayresult) {
                    return res.status(500).send({ message: "something went wrong" })
                }
                orderdone = {
                    ...orderdone, RazorpayDetails: { ...Razorpayresult, apikey: process.env.RAZORPAY_API_KEY }
                }

                return res.status(200).send({ message: "success", orderdone })

            }


        }

        catch (error) {
            console.log(error)
        }
    }
}
const Ordercontroller = new OrderController()
module.exports = Ordercontroller
