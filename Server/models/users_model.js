const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const user_Schema = new Schema({

    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    user_name: {
        type: String,
        trim: true,
        required: true,
    },
    tokens: [
        {
            token: { type: String, trim: true }
        }
    ]

});

user_Schema.methods.generateAuthToken = async function (req, res) {
    try {
        const token = await jwt.sign({ id: this._id }, process.env.JWT_SECRETE_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;

    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log("ERROR OCCOURED WHILE GENERAING AUTH TOKEN", error);
    }

}

const users_model = mongoose.model("user", user_Schema);

module.exports = users_model;