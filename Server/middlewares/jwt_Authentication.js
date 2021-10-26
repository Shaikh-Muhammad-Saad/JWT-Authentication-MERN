const jwt = require("jsonwebtoken");
const users_model = require("../models/users_model.js");


const jwt_Authentication = async (req, res, next) => {
    
    try {
        const token = req.cookies.JWT;
        const verify_user = await jwt.verify(token, process.env.JWT_SECRETE_KEY);
        const user_data = await users_model.findOne({ _id: verify_user.id });
        req.user = user_data;
        req.token = token;
        next();
    } catch (err) {
        console.log("ERROR OCCOURED WHILE VERIFYING USER", err);
        res.status(404).send("user not verified please login");
    }

};


module.exports = jwt_Authentication;
