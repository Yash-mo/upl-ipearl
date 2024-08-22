const { default: mongoose } = require("mongoose");


class ProductModel {
    constructor() {

        this.schema = new mongoose.Schema({
            brand: { type: String, require: true },
            name: { type: String, require: true },
            des: { type: String, require: true },
            image: { type: String, require: true },
            ratings: { type: String, require: true },
            price: { type: String, require: true },
            discount: { type: String, require: true },
            dis: { type: String, require: true },
            stocks: { type: Number, require: true },
        })
    }
}

const Product = new ProductModel()
const productModel = mongoose.model("tbl_products", Product.schema)

module.exports = productModel
