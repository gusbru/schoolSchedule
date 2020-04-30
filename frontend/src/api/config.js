import dotenv from "dotenv";

dotenv.config();

export const URL =
    process.env.REACT_APP_MODE === "dev"
        ? process.env.REACT_APP_BACKEND_DEV_URL
        : process.env.REACT_APP_BACKEND_PROD_URL;
