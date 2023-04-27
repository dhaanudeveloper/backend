
const jwt = require("jsonwebtoken")
const authenticate = (req, res, next) => {
    let token = req.headers.authorization
  
    if (token) {
        var decoded = jwt.verify(token, process.env.key);
        req.body.userID = decoded.userID
        next();
    }
    else {
        res.send({ "message": "Not Authorised" })
    }
}

module.exports = {
    authenticate
}
