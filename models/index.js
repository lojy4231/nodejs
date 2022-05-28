require("dotenv").config();
const mongoose = require("mongoose");

const connect = () =>{
    mongoose.connect(process.env.MONGO_URI, { ignoreUndefined: true }).catch((err) =>{
        console.error(err);
    });
};


mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
});


module.exports = connect;