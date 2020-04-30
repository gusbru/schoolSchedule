import express from "express";
import cors from "cors";
import { db } from "./db";
import routes from "./routes";
import dotenv from "dotenv";

// config .env
dotenv.config();

// Create the Express Application
export const app = express();

// config the app
app.set("port", process.env.PORT || 3030);
app.use(cors());
app.use(express.json());

// routes
app.use("/api", routes);

// custom error-handler
app.use((err, req, res, next) => {
    console.log("error handler called", err.message, err.code);

    res.status(err.code).send({ Error: err.message });
});

// disconnect and close connection to DB
process.on("SIGINT", () => {
    db.close(() => {
        console.log("Mongoose disconnected through app termination");
        process.exit(0);
    });
});
