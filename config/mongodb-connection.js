const {MongoClient} = require("mongodb")

const uri = "mongodb+srv://tourList:3KnLVMvANkwmExyW@cluster0.ebnot2e.mongodb.net/Cluster0?retryWrites=true&w=majority";

module.exports = function(callback){
    return MongoClient.connect(uri, callback)
};