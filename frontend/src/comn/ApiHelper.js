import axios from "axios"

class ApiHelper {
    constructor() {
        this.baseUrl = "http://localhost:5000"
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
        return axios.post(`${this.baseUrl}/razorpay/paymentverification`, paymentids)
    }
}


const apiHelper = new ApiHelper()
export default apiHelper