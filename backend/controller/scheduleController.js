// import User from "../models/User";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

const getAll = async (req, res, next) => {
    try {
        res.status(201).send("todo: get all saved schedules");
    } catch (error) {
        console.log("error retrieving schedules");
        console.log(error);
        error.message = "error retrieving schedules";
        error.code = 500;
        next(error);
    }
};

const userController = {
    getAll,
};

export default userController;
