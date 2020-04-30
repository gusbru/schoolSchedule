import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({ email, password });
        console.log(req.body);
        await newUser.save();
        delete newUser.password;
        console.log(newUser);
        // generate a token and send back with user email
        const token = jwt.sign({ email }, process.env.SECRET, {
            expiresIn: "1h",
        });

        const addedUser = {
            email,
            token,
        };

        res.status(201).send(addedUser);
    } catch (error) {
        console.log("error registering new user ");
        console.log(error);
        error.message = `error registering new user ${error.message}`;
        error.code = 500;
        next(error);
    }
};

const authenticate = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("invalid user email/password");
            error.code = 401;
            return next(error);
        }

        // check password
        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            console.log("password/email is not valid........");
            const error = new Error("invalid user email/password");
            error.code = 401;
            return next(error);
        }

        // issue token
        const payload = { email };
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "1h",
        });

        res.json({ token }).end();
    } catch (error) {
        console.log("internal error. try again");
        console.log(error);
        error.message = "internal error. try again";
        error.code = 500;
        next(error);
    }
};

const verifyToken = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            const error = new Error("'Unauthorized: invalid token");
            error.code = 401;
            return next(error);
        }

        const decoded = await jwt.verify(token, process.env.SECRET);

        req.email = decoded.email;

        res.json({ email: req.email }).end();
    } catch (error) {
        console.log("invalid token");
        console.log(error);
        error.code = 401;
        next(error);
    }
};

const userController = {
    register,
    authenticate,
    verifyToken,
};

export default userController;
