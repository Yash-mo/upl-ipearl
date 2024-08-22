const productModel = require("./productmodel")

class ProductController {
    constructor() { }


    // async insertProdcuts(req, res) {
    //     try {
    //         const result = await productModel.create(req.body)
    //         if (!result) {
    //             return res.status(500).send({ msessage: "something went wrong" })
    //         }
    //         return res.status(200).send({ message: "success", result: result})
    //     }
    //     catch (error) {
    //         console.log(error)
    //         return res.status(500).send({ msessage: "internal server" })
    //     }

    // }


    async getProduct(req, res) {
        try {
            const result = await productModel.find()
            if (result) {
                return res.status(200).send({ message: "success", products: result })
            }
            return res.status(500).send({ message: "something get wrong" })

        }
        catch (error) {
            return res.status(500).send({ message: "internal server error" })
        }
    }

    async getProductById(req, res) {
        try {

            const { id } = req.params
            const result = await productModel.findById(id)
            if (result) {
                return res.status(200).send({ message: "success", product: result })
            }
            return res.status(500).send({ message: "something get wrong" })

        }
        catch (error) {
            return res.status(500).send({ message: "internal server error" })
        }
    }

    async getcart(req, res) {
        try {
            const { product } = req.body
            if (!product) {
                return res.status(400).send({ message: "Missing Dependancy Product" })
            }
            const cart = await productModel.find({ _id: product }).select(["brand", "name", "des", "image", "ratings", "price", "discount", "dis", "ratings", "stocks"])

            if (!cart) {
                return res.status(500).send({ message: "something went wrong" })
            }
            return res.status(200).send({ message: "success", cart: cart })
        }
        catch (error) {
            return res.status(500).send({ message: "internal server error" })

        }
    }

}


const productController = new ProductController()
module.exports = productController