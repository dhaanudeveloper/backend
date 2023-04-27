const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    picture: { type: String, default: '' },
    name: { type: String, default: '' },
    bio: { type: String, default: '' },
    phone: { type: Number, default: 0},
    email: String,
    password: String,
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
}
