import { UnAuthenticateError } from "../errors/AuthError.js";

export default (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new UnAuthenticateError();
    }

    /**
     * Logic for user validation and extract user info
     */

    req.user = {
        id: "user-id",
        role: "customer",
    };

    next();
};
