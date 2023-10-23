const mongoose = require("mongoose");
const mongodbConnection = require("./config/mongodb-connection");

const uri = mongodbConnection.mongoURL;

/*
let collection;
app.listen(3000, async()=>{
    console.log("Server started");
    const MongoClient = await mongodbConnection();
    collection = mongodbClient.db().collection("post");
    console.log("MpngoDB connected");
})
*/

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log("MongoDB Connected...");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;