const mongoose = require("mongoose")

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.log(error.message))
};


module.exports = connectDB;