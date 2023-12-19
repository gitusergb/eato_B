const mongoose= require("mongoose");
require("dotenv").config()
const connection =mongoose.connect(process.env.Mongo_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log("DB Connect successfull")

module.exports={
    connection
}

