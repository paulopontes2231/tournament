import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  throw new Error("Missing MONGODB_URI or MONGODB_DB in .env");
}

async function run() {
  const client = new MongoClient(uri!);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection("users");

    const users = await collection.find({}).toArray();

    console.log("Users:", users);
  } catch (err) {
    console.error("Error:", err);
  } 
}

run();