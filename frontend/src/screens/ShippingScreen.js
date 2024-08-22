import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../Components/Input'
import Loader from '../Components/Loader'
import CheackOutStep from '../Components/CheakOutStep'
import Validator from '../Components/validation'
// import MessageBox from '../Component/MessageBox'
// import './shipping.css'

export default function Shippingscreen() {
    const navigate = useNavigate()
    const [paymentmethod, setpaymentmethod] = useState("online")
    // eslint-disable-next-line
    const [err, seterr] = useState("")
    const [isSubmited, setIsSubmited] = useState(false)
    const [shippingError, setshippingError] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [Address, setAddress] = useState({
        fullName: "",
        phonenumber: "",
        address: "",
        city: "",
        state: "",
        email: "",
        pincode: ""
    })

    const AddressHandler = () => {
        try {
            setIsSubmited(true)
            const ValidationResult = Validator(Address, "shipping")
            // console.log(ValidationResult)

            if (ValidationResult.length > 0) {
                setshippingError(ValidationResult)
                return
            }

            setisLoading(true)

            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")

            userInfo.address = Address

            localStorage.setItem("userInfo", JSON.stringify(userInfo))
            setisLoading(false)

            navigate(`/Placeorder?paymentmethod=${paymentmethod}`)




        } catch (error) {
            setisLoading(false)
            if (error.response && error.response.data) {
                if (error.response.status === 400 && error.response.data.message === "Validation Error") {
                    setshippingError(error.response.data.ValidationResult)

                    return
                }
                seterr(error.response.data.message)
                return
            } else {
                seterr(error.message)
                return

            }
        }
    }



    return (

        <div className="container">

            <div className="py-2 text-center">
                <Loader isLoading={isLoading} />
                <CheackOutStep signin={true} shipping={true} />
                {/* <MessageBox error={err} seterror={seterr} /> */}
                <h2 className="mt-5">Checkout</h2>

            </div>
            <div className="row">
                <div className="col-md-4 order-md-2 py-5 mb-4 border border-grey">
                    <h4 className="d-flex justify-content-center align-items-center mb-3">
                        <span className="text-muted">Payment Method</span>

                    </h4>
                    <div className="pt-3 ">
                        <div className="rounded m-auto border d-flex justify-content-center w-75 px-3 py-2  align-items-center">
                            <div className="payment d-flex align-items-center justify-content-center pe-3">
                                <input className="" type="radio" value={"online"} name="flexRadioDefault" id="specifyColor" checked={paymentmethod === "online"} onChange={(e) => setpaymentmethod(e.target.value)} />
                            </div>
                            <div className="d-flex flex-column py-1">
                                <p className="mb-1 fw-bold text-primary">Online</p>

                            </div>
                        </div>

                        <div className="d-flex flex-row pb-3 pt-4">
                            <div className="rounded m-auto border d-flex justify-content-center w-75 px-3 py-2  align-items-center">
                                <div className="payment d-flex align-items-center justify-content-center pe-3">
                                    <input className="me-3" type="radio" value={"COD"} name="flexRadioDefault" id="specifyColor" checked={paymentmethod === "COD"} onChange={(e) => setpaymentmethod(e.target.value)} />
                                </div>
                                <div className="d-flex flex-column py-1">
                                    <p className="mb-1 fw-bold text-primary ">COD</p>

                                </div>
                            </div>
                        </div>
                        <div className="button m-auto justify-content-center mb-4 text-center" >

                            <button type="button" className=" btn btn-warning btn-lg w-50" onClick={AddressHandler}>Continue</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-8 order-md-1 ">
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation" noValidate="">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">Full name</label>
                                <Input isError={shippingError.find((x) => x.key === "fullName") ? true : false}
                                    hintText={shippingError.find((x) => x.key === "fullName")?.message}
                                    type="text" className="form-contrl" value={Address.fullName} required
                                    onChange={(e) => {
                                        setAddress({ ...Address, fullName: e.target.value })
                                        if (isSubmited) {
                                            const validationResult = Validator({ ...Address, fullName: e.target.value }, "shipping")
                                            setshippingError(validationResult)
                                        }
                                    }}
                                />
                                <div className="invalid-feedback">
                                    Please enter your fullName.
                                </div>

                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Phone number</label>
                                <Input isError={shippingError.find((x) => x.key === "phonenumber") ? true : false}
                                    hintText={shippingError.find((x) => x.key === "phonenumber")?.message}
                                    type="text" className="form-contrl" value={Address.phonenumber} required
                                    onChange={(e) => {
                                        setAddress({ ...Address, phonenumber: e.target.value })
                                        if (isSubmited) {
                                            const validationResult = Validator({ ...Address, phonenumber: e.target.value }, "shipping")
                                            setshippingError(validationResult)
                                        }
                                    }}
                                />
                                <div className="invalid-feedback">
                                    Please enter your phonenumber.
                                </div>

                            </div>

                        </div>


                        <div className="mb-3">
                            <label htmlFor="email">
                                Email
                            </label>
                            <Input isError={shippingError.find((x) => x.key === "email") ? true : false}
                                hintText={shippingError.find((x) => x.key === "email")?.message}
                                type="text" className="form-contrl" value={Address.email} required
                                onChange={(e) => {
                                    setAddress({ ...Address, email: e.target.value })
                                    if (isSubmited) {
                                        const validationResult = Validator({ ...Address, email: e.target.value }, "shipping")
                                        setshippingError(validationResult)
                                    }
                                }}
                            />
                            <div className="invalid-feedback">
                                Please enter your email.
                            </div>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="address">Address</label>
                            <Input isError={shippingError.find((x) => x.key === "address") ? true : false}
                                hintText={shippingError.find((x) => x.key === "address")?.message}
                                type="text" className="form-contrl" value={Address.address} required
                                onChange={(e) => {
                                    setAddress({ ...Address, address: e.target.value })
                                    if (isSubmited) {
                                        const validationResult = Validator({ ...Address, address: e.target.value }, "shipping")
                                        console.log(validationResult)
                                        setshippingError(validationResult)
                                    }
                                }}
                            />
                            <div className="invalid-feedback">
                                Please enter your address.
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="country">City</label>
                                <Input isError={shippingError.find((x) => x.key === "city") ? true : false}
                                    hintText={shippingError.find((x) => x.key === "city")?.message}
                                    type="text" className="form-contrl" value={Address.city} required
                                    onChange={(e) => {
                                        setAddress({ ...Address, city: e.target.value })
                                        if (isSubmited) {
                                            const validationResult = Validator({ ...Address, city: e.target.value }, "shipping")
                                            setshippingError(validationResult)
                                        }
                                    }}
                                />
                                <div className="invalid-feedback">
                                    Please enter your city.
                                </div>

                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="state">State</label>
                                <select className="form-select" id="validationCustom04" required
                                    onChange={(e) => {
                                        setAddress({ ...Address, state: e.target.value })
                                    }}>
                                    <option disabled value="">Choose...</option>
                                    <option>Andhra Pradesh</option>
                                    <option>Andaman and Nicobar Islands</option>
                                    <option>Arunachal Pradesh</option>
                                    <option>Assam</option>
                                    <option>Bihar</option>
                                    <option>Chandigarh</option>
                                    <option>Chhattisgarh</option>
                                    <option>Dadar and Nagar Haveli</option>
                                    <option>Daman and Diu</option>
                                    <option>Delhi</option>
                                    <option>Lakshadweep</option>
                                    <option>Puducherry</option>
                                    <option> Goa</option>
                                    <option>Gujarat</option>
                                    <option>Haryana</option>
                                    <option>Himachal Pradesh</option>
                                    <option>Jammu and Kashmir</option>
                                    <option>Jharkhand</option>
                                    <option>Karnataka</option>
                                    <option>Kerala</option>
                                    <option>Madhya Pradesh</option>
                                    <option>Maharashtra</option>
                                    <option>Manipur</option>
                                    <option>Meghalaya</option>
                                    <option>Mizoram</option>
                                    <option>Nagaland</option>
                                    <option>Odisha</option>
                                    <option>Punjab</option>
                                    <option>Rajasthan</option>
                                    <option>Sikkim</option>
                                    <option>Tamil Nadu</option>
                                    <option>Telangana</option>
                                    <option>Tripura</option>
                                    <option>Uttar Pradesh</option>
                                    <option>Uttarakhand</option>
                                    <option>West Bengal</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please enter your State.
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="pincode">pincode</label>
                                <Input isError={shippingError.find((x) => x.key === "pincode") ? true : false}
                                    hintText={shippingError.find((x) => x.key === "pincode")?.message}
                                    type="text" className="form-contrl" value={Address.pincode} required
                                    onChange={(e) => {
                                        setAddress({ ...Address, pincode: e.target.value })
                                        if (isSubmited) {
                                            const validationResult = Validator({ ...Address, pincode: e.target.value }, "shipping")
                                            setshippingError(validationResult)
                                        }
                                    }}
                                />
                                <div className="invalid-feedback">
                                    Please enter your pincode.
                                </div>
                            </div>

                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}
