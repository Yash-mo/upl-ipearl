const express = require("express")
const productController = require("./product/ProductController")
const cors = require("cors")
const ConnectDb = require("./connection")
const userController = require("./User/UserController")
const Ordercontroller = require("./order/OrderController")
const PaymentController = require('./razorpay/PaymentController.js')
const router = require('./razorpay/razorpayroute.js')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })




const app = express()
app.use(cors(
    {
     origin:[],
     methods:["POST","GET"],
     credentials:true
    }
    ));
ConnectDb()

app.use(express.json())
mongoose.connect('mongodb+srv://omamu65:Zarnamodi3002@cluster0.d4wqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.get("/", (req, res) => {
    return res.status(200).send({ message: "success" })
})


app.get("/product", productController.getProduct)
app.get("/product/:id", productController.getProductById)
app.post("/Addtocart", productController.getcart)

// app.get("/api/product/insertMany", productController.insertProdcuts),
// app.post("/api/product/insertMany", productController.insertProdcuts),


app.post("/user/login", userController.userLogin)
app.post("/user/register", userController.userRegister)
app.post("/payment", Ordercontroller.createOrder)
app.post("/razorpay", router)
app.post("/razorpay/paymentverification", PaymentController.Paymentverify)


// app.listen(5000, () => {
//     console.log("server started")
// })


app.listen(process.env.PORT || 5000, () => {
    console.log(`server is started on ${process.env.PORT}`)
})

