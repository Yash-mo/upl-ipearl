import { useState } from "react"
import { useNavigate } from "react-router-dom"
import apiHelper from "../comn/ApiHelper"

export default function Regscreen() {

    const navigate = useNavigate()

    const [registerDetails, setregisterDetails] = useState({


        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""

    })

    const RegisterHandler = async ({ setUserInfo, setToken }) => {
        try {
            const result = await apiHelper.userRegister(registerDetails)

            if (result.data && result.data.token && result.data.userinfo) {
                localStorage.setItem("userinfo", JSON.stringify(result.data.userinfo))
                localStorage.setItem("token", result.data.token)

                setUserInfo(result.data.userinfo)
                setToken(result.data.token)
                navigate("/product")
                return
            }
        }
        catch (error) {
            console.log(error)
        }


    }
    return (
        <>

            <div className="Auth-form-container container pt-5">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Create Account</h3>

                        <div className="form-group mt-3">
                            <label>First Name</label>
                            <input
                                onChange={(e) => setregisterDetails({ ...registerDetails, firstName: e.target.value })}
                                id="firstname"
                                type="text"
                                className="form-control mt-1"
                                placeholder="First Name"
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Last Name</label>
                            <input
                                onChange={(e) => setregisterDetails({ ...registerDetails, lastName: e.target.value })}
                                id="lastname"
                                type="text"
                                className="form-control mt-1"
                                placeholder="Last Name"
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Phone</label>
                            <input
                                onChange={(e) => setregisterDetails({ ...registerDetails, phone: e.target.value })}
                                id="text"
                                type="text"
                                className="form-control mt-1"
                                placeholder="+91"
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                onChange={(e) => setregisterDetails({ ...registerDetails, email: e.target.value })}
                                id="email"
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                onChange={(e) => setregisterDetails({ ...registerDetails, password: e.target.value })}
                                id="password"
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                            />
                        </div>

                        <div className="d-grid gap-2 mt-3" >
                            <button onClick={() => navigate("/")}
                                // onClick={LoginHandler}
                                type="button" className="btn " style={{ backgroundColor: "yellow" }}>
                                Sign in
                            </button>
                        </div>

                        <div className="d-grid gap-2 mt-3">
                            <button type="button" className="btn btn-primary" onClick={RegisterHandler} >
                                Create Account
                            </button>
                        </div>

                        <p className="forgot-password text-right mt-2">

                            Forgot <a href="..">password?</a>
                        </p>
                    </div>
                </form >
            </div >

        </>
    )

}