const express = require("express");
const app = express();
const cors = require("cors")
app.use(express.json());
app.use(cors())
require('dotenv').config()

const {userRoute}=require("./route/userroute")
const { connection } = require("./config/db");



app.get("/", (req,res) => {
    res.send("Welcome to Backend")
})


app.use("/users",userRoute)





app.listen(4500, async (req, res) => {
    try {
        await connection;
        console.log("DB is connected")
    }
    catch (err) {
        console.log(err, "DB is NOT connected")
    }
    console.log("Listening at Port 4500")
})