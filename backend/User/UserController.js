const userModel = require("./UserModel");
const bcrypt = require("bcrypt")
const Jwt = require("jsonwebtoken");
const Validation = require("./Validation");

class UserController {

    async userLogin(req, res) {

        try {

            // get data from client using server link using req.body
            const { email, password } = req.body
            let validationResult = Validation(req.body, 'login')
            
            if (validationResult.length > 0) {
                return res.status(400).send({ message: "validation error", errors: validationResult })
            }
            
            // email was finded using findone function from usermodel
            let result = await userModel.findOne({ email: email })
            
            if (!result) return res.status(400).send({ message: "Validation error", errors: [{ keys: 'Email', message: 'email is not exist' }] })
                
                //get data from monogodb, mongodb returnes to many files to avoid that ._doc is nessesary
                result = result._doc
                
                // compares result.password with bcrypted password if not sends error
                if (!bcrypt.compareSync(password, result.password)) {
                    return res.status(400).send({ message: "Validation error", errors: [{ key: 'password', message: 'Email and Password are not matched' }] })
                }
                // delete the old result.passsword 
                delete result.password
                // create a token of result data
                const token = Jwt.sign(result, "yashmodi", { expiresIn: "20d" })

            result = {
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email
            }

            if (!token) return res.status(500).send({ message: "something went wrong" })
            // sends back ||result object as userinfo||and crated token as token
            return res.status(200).send({ message: "success", userinfo: result, token: token })
        } catch (error) {
            console.log(error)
        }
    }

    async userRegister(req, res) {
        console.log("signup - api reached cotnroller")
        try {
            // get data from thunderclient using req.body
            const { firstName, lastName, email, password } = req.body

            // incrypt password using bcrypt 
            const enPassword = bcrypt.hashSync(password, 8)
            if (!enPassword) return res.status(500).send({ message: "something went wrong" })
            // old requsted password changed into enpassword
            req.body.password = enPassword

            // a new data created as usermodel form in mongodb using create function
            let user = await userModel.create(req.body)

            console.log(user);
            if (!user) return res.status(500).send({ message: "something went wrong" })
            //get data from monogodb, mongodb returnes to many files to avoid that ._doc is nessesary
            user = user._doc
            // delete old normal password
            delete user.password

            const token = Jwt.sign(user, "yashmodi", { expiresIn: "20d" })
            if (!token) {
                return res.status(500).send({ message: "somrthing is worng" })
            }
            // returns the all user data (email,fname,lname,pass) as userinfo and token as token
            return res.status(200).send({ message: "success", userinfo: user, token: token })
        }
        catch (error) {
            if (error && error.code === 11000) {
                return res.status(400).send({ messge: "email already exist" })
            }
            console.log(error)
            return res.status(500).send({ message: "internal server error" })
        }

    }
}
// console.log(Jwt)
const userController = new UserController()
module.exports = userController