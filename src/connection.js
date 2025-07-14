import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();


const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopologY: true}, (err) => {
    console.log(uri)
if(!err){
    console.log("Connected to MongoDB")
    mongoose.connection.db = mongoose.connection.useDb(dbName);
}else{
    console.log(err)
}   
})

module.exports = mongoose