import axios from "axios"

class ApiHelper {
    constructor() {
        // this.baseUrl = "http://localhost:5000"
        this.baseUrl = "https://upl-ipearl-git-master-yashs-projects-34ce0a50.vercel.app"
    }

    fetchproducts() {
        return axios.get(`${this.baseUrl}/product`)
    }
    fetchproductByid(id) {
        return axios.get(`${this.baseUrl}/product/${id}`)
    }
    userLogin(LoginDetails) {
        return axios.post(`${this.baseUrl}/user/login`, LoginDetails)
    }
    userRegister(registerDetails) {
        return axios.post(`${this.baseUrl}/user/register`, registerDetails)
    }
    fetchcart(product) {
        return axios.post(`${this.baseUrl}/Addtocart`, { product: product })
    }
    Placeorder(orderDetails) {
        return axios.post(`${this.baseUrl}/payment`, orderDetails)
    }
    PaymentVerify(paymentids) {
        console.log("paymentids")
        return axios.post(`${this.baseUrl}/razorpay/paymentverification`, paymentids)
    }
}


const apiHelper = new ApiHelper()
export default apiHelper