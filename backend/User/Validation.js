function Validation(data, type) {
    let errors = []
    if (type === "login") {

        if (!data.email) {
            errors.push({ key: "email", message: "required field Email is Empty" })
        } else if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/.test(data.email))) {
            errors.push({ key: "email", message: "Invalid Email" });
        }


        if (!data.password) {
            errors.push({ key: "password", message: "required field password is Empty" })
        } else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,16}$/.test(data.password))) {
            errors.push({ key: "password", message: "password is too weak" });
        }

 
        return errors

    }
}
module.exports = Validation