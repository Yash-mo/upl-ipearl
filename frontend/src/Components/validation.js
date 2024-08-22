export default function Validator(data, type) {

    let errors = []

    if (type === "Register") {
        if (!data.firstname) {
            errors.push({ key: "firstname", message: "Required Field Empty" })

        } else if (data.firstname.length <= 2) {
            errors.push({ key: "firstname", message: "Firstname Atleast 3 Characters" })
        }

        if (!data.lastname) {
            errors.push({ key: "lastname", message: "Required Field Empty" })

        } else if (data.lastname.length <= 2) {
            errors.push({ key: "lastname", message: "Firstname Atleast 3 Characters" })
        }

        // For Email
        if (!data.email) {
            errors.push({ key: "email", message: "Please Enter email" })
        }
        // eslint-disable-next-line
        else if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/.test(data.email))) {
            errors.push({ key: "email", message: "Inavalid Email" })
        }

        //For Password
        if (!data.password) {
            errors.push({ key: "password", message: "Please Enter password" })
        } else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(data.password))) {
            errors.push({ key: "password", message: "password must contain one digit from 1 to 9 " })
        }


        if (!data.confirmpassword) {
            errors.push({ key: "confirmpassword", message: "Required field is empty" })
        } else {
            if (data.password !== data.confirmpassword) {
                errors.push({ key: "confirmpassword", message: "password and confirmpassword are not match" })
            }
        }



        return errors
    } else if (type === "shipping") {

        //For FullName Error
        if (!data.fullName) {
            errors.push({ key: "fullName", message: "Please Enter fullName" })
        } else if (data.fullName.length <= 2) {
            errors.push({ key: "fullName", message: "Invalid fullName" })
        }

        //For Address Error
        if (!data.address) {
            errors.push({ key: "address", message: "Please Enter Address" })// eslint-disable-next-line
        } else if (!(/[A-Za-z'\.\-\s\,]{5,}$/.test(data.address))) {
            errors.push({ key: "address", message: "Invalid Address" })
        }

        //For Mobile Number Error
        if (!data.phonenumber) {
            errors.push({ key: "phonenumber", message: "Please Enter Mobile Number" })
        } else if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(data.phonenumber))) {
            errors.push({ key: "phonenumber", message: "Invalid Mobile Number " })
        }

        //For Pin  Number Error
        if (!data.pincode) {
            errors.push({ key: "pincode", message: "Please Enter pincode Number" })
        } else if (!(/^(\d{4}|\d{6})$/.test(data.pincode))) {
            errors.push({ key: "pincode", message: "Invalid pincode Number " })
        }

        // For Email
        if (!data.email) {
            errors.push({ key: "email", message: "Please Enter email" })
        } // eslint-disable-next-line
        else if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email))) {
            errors.push({ key: "email", message: "Inavalid Email" })
        }

        //For City Error
        if (!data.city) {
            errors.push({ key: "city", message: "Please Enter City Name" })
        } else if (!(/^[a-zA-Z '.-]{2,10}$/.test(data.city))) {
            errors.push({ key: "city", message: "Invalid City" })
        }

    }

    else if (type === "otpverify") {
        if (!data.email) {
            errors.push({ key: "email", message: "Please Enter email" })
        }
        // eslint-disable-next-line
        else if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/.test(data.email))) {
            errors.push({ key: "email", message: "Inavalid Email" })
        }

        //For Password
        if (!data.password) {
            errors.push({ key: "password", message: "Please Enter password" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(data.password))) {
            errors.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        }

        if (!data.otp) {
            errors.push({ key: "otp", message: "otp is required" })
        }
        else if (data.otp < 6) {
            errors.push({ key: "otp", message: "6 digits is requierd" })
        }

    }

    else if (type === "login") {

            if (!data.email) {
                errors.push({ key: "email", message: "required field Email is Empty" })
                //eslint-disable-next-line
            } else if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/.test(data.email))) {
                errors.push({ key: "email", message: "Invalid Email" });
            }


            if (!data.password) {
                errors.push({ key: "password", message: "required field password is Empty" })
            } else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,16}$/.test(data.password))) {
                errors.push({ key: "password", message: "password is too weak" });
            }




        }
    return errors
}
