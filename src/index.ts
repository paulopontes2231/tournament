import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connection } from "mongoose";

dotenv.config();

const port = 3000;
const playersRoute = require("./routes/players");
const sudokuRoute = require("./routes/sudoku");

const app = express();
const uri = process.env.MONGODB_URI;
const db = process.env.MONGODB_DB;
if (!uri) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
}
if (!db) {
    throw new Error("MONGODB_DB is not defined in the environment variables.");
}

app.listen(port, () => {
    console.log("App is running on port " + port + "!");
    connection.openUri(uri, {
    }), (err: string) => {
        if (err) {
            console.error("Error connecting to MongoDB:", err);
        }
    }
    console.log("Connected to MongoDB successfully!");
    const dbConnection = connection.useDb(db);
    console.log("Using database:", dbConnection.name);
});
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use('/', playersRoute);
app.use('/', sudokuRoute);
