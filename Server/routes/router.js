const express = require("express");
const users_model = require("../models/users_model.js");
const bcrypt = require("bcrypt");
const jwt_Authentication = require("../middlewares/jwt_Authentication.js");


const router = express.Router();

router.get("/data", (req, res) => res.json({ data: "some data" }));


router.post("/register", async (req, res) => {

    const { email, password, user_name } = req.body;

    if (!email || !password || !user_name) {
        res.status(400).send("kindly provide all fields");
    }

    const hashed_password = await bcrypt.hash(password, 10);

    try {
        const user_details = new users_model({
            email: email,
            password: hashed_password,
            user_name: user_name
        });
        const response = await user_details.save();
        res.status(200).send("user resgistered successfully")
        console.log("USER REGISTERED SUCCESSFULLY", response);

    } catch (error) {
        res.send(error)
        console.log("ERROR OCCORED WHILE REGISTRING USER", error)
    }

});



router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send("kindly provide all fields");
    }
    try {
        const user = await users_model.findOne({ email: email });

        if (user) {
            const isPassword = await bcrypt.compare(password, user.password);

            if (isPassword) {
                const token = await user.generateAuthToken();
                res.cookie("JWT", token, { expire: Date.now() + 86400000 })
                res.status(200).json(user);
            }
            else {
                res.status(404).send("Invalid Credentials");
            }

        }
        else {
            res.status(404).send("User Does Not Exist");
        }
    } catch (error) {
        console.log("LOGIN ERROR", error);
        res.status(500).send("Internal Server Error");
    }

});



router.get("/posts", jwt_Authentication, (req, res) => {

    res.status(200).json(req.user);

});


router.get("/logout", jwt_Authentication, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((val)=> val.token != req.token )
        res.clearCookie("JWT");
        await req.user.save();
        console.log("hi");
        res.status(200).send("user loggd out successfully");
    } catch (err) {
        console.log("ERROR OCCOURED WHILE LOGGING-OUT ERROR");
    }

});

module.exports = router;