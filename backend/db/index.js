import mongoose from "mongoose";
import dotenv from "dotenv";

// config .env
dotenv.config();

const mongoDB = process.env.MONGO_URL;

// create index
mongoose.set("useCreateIndex", true);

// set promise
mongoose.promise = global.Promise;

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.log(error);
    }
};

// getting the connection
export const db = mongoose.connection;

// checking for a error
db.on("error", error => {
    console.log("error connecting to mongoDB...", error);
});
