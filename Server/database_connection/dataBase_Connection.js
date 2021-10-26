const mongoose = require("mongoose");

const connect_Database = async () => {

    try {
        const connect = await mongoose.connect(process.env.DATABASE_CONNECTIOIN_STRING);
        console.log("databse connected successfully");
    } catch (error) {
        console.log(`ERROR OCCOURED WHILE CONNECTION DATABASE: ${error}`)
    }

};

module.exports = connect_Database;