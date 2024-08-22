const mongoose = require('mongoose')
class ReceiptModel {
    constructor() {
        this.schema = new mongoose.Schema({
            orderId: { type: String, require: true },
            razorpay_payment_id: { type: String, require: true },
            razorpayOrderId: { type: String, require: true }

        })

    }
}
const Receipt = new ReceiptModel()
const receipt = mongoose.model("tbl_receipt", Receipt.schema)

module.exports = receipt