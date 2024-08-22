import apiHelper from "./ApiHelper"

const LoadRazorPay = () => {

    return new Promise((resolve) => {
        const scrpit = document.createElement("script")
        scrpit.src = 'https://checkout.razorpay.com/v1/checkout.js'
        scrpit.async = true
        scrpit.onload = () => {
            resolve(window.Razorpay)
        }
        document.body.appendChild(scrpit)
    })
}

const HandlePayment = async (paymentOptions) => {
    console.log(paymentOptions);
    const razorpay = await LoadRazorPay()

    const options = {
        key: paymentOptions.apikey,
        amount: paymentOptions.amount,
        currency: paymentOptions.currency,
        name: paymentOptions.name,
        description: 'Test Payment',
        order_id: paymentOptions.razorpayOrderId,
        handler: async function (response) {
            const { razorpay_payment_id, razorpay_signature, razorpay_order_id } = response


            if (response && response.razorpay_payment_id) {
                try {
                    const result = await apiHelper.PaymentVerify({ razorpay_payment_id: razorpay_payment_id, orderId: paymentOptions.orderId, razorpayOrderId: razorpay_order_id, signature: razorpay_signature })
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
                        paymentOptions.showError(error)
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