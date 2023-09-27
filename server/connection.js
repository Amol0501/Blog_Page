const mongoose = require("mongoose");

const mongo_url = "mongodb+srv://amolaggarwal2004:amol123@cluster0.zi9h12u.mongodb.net/blogs?retryWrites=true&w=majority";

const connectDB = async () => {
    const connection = await mongoose.connect(mongo_url);
    if(connection)
        console.log("Database Connected");
    else
        console.log("Database connection failed")
};

module.exports = {connectDB};