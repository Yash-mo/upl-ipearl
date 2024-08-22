import { useState } from "react"
import apiHelper from "../comn/ApiHelper"
import { useNavigate } from "react-router-dom"
import Validation from "../Components/validation"
import Validator from "../Components/validation"

export default function Loginscreen(props) {

    const { setUserInfo, setToken } = props

    const [LoginDetails, setLoginDetails] = useState({

        email: "",
        password: ""

    })

    const [ValidationErrors, setValidationErrors] = useState([])
    const [isSubmited, setisSubmited] = useState(false)

    const navigate = useNavigate()

    const LoginHandler = async () => {


        try {

            setisSubmited(true)
            /* validation of data .if any errors occurs in validation then
             "validationresult" array will fill otherwise its empty*/

            const ValidationResult = Validation(LoginDetails, "login")

            // if any of errors filled in array then this function will work
            if (ValidationResult.length > 0) {
                setValidationErrors(ValidationResult)
                return
            }
            console.log(LoginDetails)
            let result = await apiHelper.userLogin(LoginDetails)


            if (result && result.data && result.data.userinfo && result.data.token) {
                localStorage.setItem("userInfo", JSON.stringify(result.data.userinfo))
                localStorage.setItem("token", result.data.token)
                setUserInfo(result.data.userinfo)
                setToken(result.data.token)
                navigate("/product")
            }
        }
        catch (error) {

            console.log(error)
            if (error && error.response && error.response.status === 400) {
                setValidationErrors(error.response.data.errors)
            }
        }

    }

    // to disable backside button by clearing history after logout
    // const closeback = () => {
    //     window.history.pushState(null, null, window.location.href);
    //     window.addEventListener('popstate', () => {
    //         window.history.pushState(null, null, window.location.href);
    //     })
    // }
    // useEffect(() => { closeback() }, [])

    return (
        <>

            <div className="Auth-form-container pt-2 pb-3">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>

                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input

                                onChange={(e) => {
                                    setLoginDetails({ ...LoginDetails, email: e.target.value })
                                    if (isSubmited) {
                                        const validationresult = Validator({ ...LoginDetails, email: e.target.value }, "login")
                                        setValidationErrors(validationresult)
                                    }
                                }}
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                            {ValidationErrors.find((x) => x.key === "email") ? (
                                <span className="text-danger">
                                    {ValidationErrors.find((x) => x.key === "email").message}

                                </span>
                            ) : ""}
                        </div>

                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                onChange={(e) => {
                                    setLoginDetails({ ...LoginDetails, password: e.target.value })
                                    if (isSubmited) {
                                        const validationresult = Validation({ ...LoginDetails, password: e.target.value }, "login")
                                        setValidationErrors(validationresult)
                                    }
                                }}
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"

                            />
                            {ValidationErrors.find((x) => x.key === "password") ? (
                                <span className="text-danger">
                                    {ValidationErrors.find((x) => x.key === "password").message}

                                </span>
                            ) : ""}
                        </div>

                        <div className="d-grid gap-2 mt-3">
                            <button onClick={LoginHandler} type="button" className="btn " style={{ backgroundColor: "yellow" }}>
                                Sign in
                            </button>
                        </div>

                        <div onClick={() => navigate("/registration")} className="d-grid gap-2 mt-3" style={{ textDecoration: "none" }}>
                            <button type="button" className="btn btn-primary" style={{ textDecoration: "none" }} >
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