const { default: mongoose } = require("mongoose");

class UseerModel {

    constructor() {
        // schema was created to insert register inputs in same form as schmema
        this.schema = new mongoose.Schema({
            firstName: { type: String, require: true },
            lastName: { type: String, require: true },
            email: { type: String, require: true, unique: true },
            password: { type: String, default: true },
            phone: { type: String, default: null },
            isAdmin: { type: Boolean, default: false },
        }, {
            timestamps: true
        })
    }
}
// schema was exported to use in usermodels
const User = new UseerModel()
const userModel = mongoose.model("tbl_users", User.schema)

module.exports = userModel