import apiHelper from "./ApiHelper"

const LoadRazorPay = () => {

    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        script.onload = () => {
            resolve(window.Razorpay)
        }
        document.body.appendChild(script)        
    })
}

const HandlePayment = async (paymentOptions) => {
    const razorpay = await LoadRazorPay()
    console.log(paymentOptions)
    const options = {
        key: paymentOptions.apikey,
        amount: paymentOptions.amount,
        currency: paymentOptions.currency,
        name: paymentOptions.name,
        description: 'Test Payment',
        order_id: paymentOptions.razorpayOrderId,
       
        handler: async function (response) {
            console.log("here")
            const { razorpay_payment_id, razorpay_signature, razorpay_order_id } = response
            
            
            if (response && response.razorpay_payment_id) {
                try {
                    console.log("paymentverify")
                    const result = await apiHelper.PaymentVerify({ razorpay_payment_id: razorpay_payment_id, orderId: paymentOptions.orderId, razorpayOrderId: razorpay_order_id, signature: razorpay_signature })
                    console.log(result)
                    if (result && result.status === 200) {

                        alert("Save This Refrence No.: " + result.data.RefrenceNo);
                        localStorage.removeItem('cartItems')
                        localStorage.setItem('cartItems', '')
                        paymentOptions.navigate(`/product`)
                    } else {
                        return alert("Payment Verification Failed")
                    }
                } catch (error) {
                    console.log(error);
                    if (error && error.response && error.response.data && error.response.data.message) {
                        paymentOptions.showError(error.response.data.message)
                    } else {
                        paymentOptions.showError("An unexpected error occurred during payment verification.")
                    }
                }                
            } else {
                return alert("something wrong with payment")
            }
        },
        prefill: {
            name: paymentOptions.name,
            email: paymentOptions.email,
            contact: paymentOptions.phone,
        },
        notes: {
            address: paymentOptions.address
        },
        theme: {
            color: "#000",
        },
        payment_method: {
            card: true,
            netbanking: true,
            wallet: true,
            upi: true,
        },
    }
    const paymentObject = new razorpay(options)
    paymentObject.open();
}

export default HandlePayment