const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRoute = express.Router();
userRoute.use(express.json());

const { authenticate } = require("../middleware/authenticate.middleware");

const { UserModel } = require("../model/usermodel.model")

userRoute.post("/register", async (req, res) => {
    const { picture, name, bio, phone, email, password } = req.body
    try {
        let userFound = await UserModel.find({ email });
        if (userFound.length > 0) {
            res.send({ "message": "User already REGISTERED" })
        }
        else {
            bcrypt.hash(password, 5, async function (err, securedPass) {
                let userData = new UserModel({ picture, name, bio, phone, email, password: securedPass })
                await userData.save();

                res.send({ "message": "User registered" })
            });
        }
    }
    catch (err) {
        res.send("error")
        console.log(err)
    }

})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    const data = await UserModel.findOne({ email });

    try {

        bcrypt.compare(password, data.password, function (err, result) {
            if (result) {
                let token = jwt.sign({ userID: data._id }, process.env.key);
                res.send({ "message": "Validation done", "token": token })
            }
            else {
                res.send({ "message": "Incorrect Credentials" })
            }
        });
    }
    catch (err) {
        res.send("error")
        console.log(err)
    }
})


userRoute.use(authenticate)

userRoute.get("/", async (req, res) => {
    const ID = req.body.userID;
    try {
        const data = await UserModel.findOne({ _id: ID });
        res.send(data)
    }
    catch (err) {
        res.send("error")
        console.log(err)
    }
})



userRoute.patch("/update/", async (req, res) => {
  
    const payload = req.body
    try {
        const data = await UserModel.findOneAndUpdate({ _id: payload.userID }, payload)
        res.send({ "message": "Data is updated" })
    }
    catch (err) {
        console.log(err)
        res.send({ "message": "ERROR" })
    }

})

userRoute.delete("/", async (req, res) => {

})


module.exports = {
    userRoute
}