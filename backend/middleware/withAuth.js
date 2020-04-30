import jwt from "jsonwebtoken";

const withAuth = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            const error = new Error("'Unauthorized: No token provided");
            error.code = 401;
            return next(error);
        }

        const decoded = await jwt.verify(token, process.env.SECRET);

        req.email = decoded.email;

        next();
    } catch (error) {
        console.log("invalid token");
        console.log(error);
        error.code = 401;
        next(error);
    }
};

export default withAuth;
