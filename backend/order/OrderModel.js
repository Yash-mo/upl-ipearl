const { default: mongoose } = require("mongoose");

class OrderModel {
    constructor() {
        this.Schema = new mongoose.Schema({
            products: { type: Array, required: true },
            paymentMethod: { type: String, required: true, default: "cod" },
            paymentStatus: { type: String, required: true, default: "pending" },
            totalPrice: { type: Number, required: true },
            shippingAddress: { type: Object, required: true },
            deliverdStatus: { type: String, required: true, default: "pending" },
            deliverdIn: { type: Date, required: true }
        }, { timestamps: true })

    }
}
const order = new OrderModel()
const orderModel = mongoose.model("tbl_order", order.Schema)
module.exports = orderModel