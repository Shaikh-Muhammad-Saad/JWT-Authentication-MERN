require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connect_Database = require("./database_connection/dataBase_Connection.js");
const router = require("./routes/router.js");
const cookie_Parser =  require("cookie-parser");


const port = process.env.PORT ;
const app = express();
connect_Database();


app.use(cookie_Parser()); //cookie parser must be placed before the router.
app.use(cors());
app.use(express.json());
app.use(router);

const  user = {
    _id: "123456789"
};


// function callme(){
//     const token  = jwt.sign({id : user._id}, process.env.JWT_SECRETE_KEY);
//     const verify = jwt.verify(token.toString() , process.env.JWT_SECRETE_KEY);
//     console.log(verify);
// }
// callme();

app.listen(port , ()=> console.log("server running on port: " + port));
