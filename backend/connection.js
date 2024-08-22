const { default: mongoose } = require("mongoose")

const ConnectDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/amazona7")
        console.log("DB Conncted")
    }
    catch (error) {
        console.group(error)
        console.log("Db Connection lost")
    }
}
module.exports=ConnectDb