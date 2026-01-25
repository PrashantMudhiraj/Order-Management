import { ForbiddenError } from "../errors/AuthError.js";

export default (req, res, next) => {
    // console.log(req.ip);
    // if (req?.user?.role === "admin") {
    //     return next();
    // }

    // if (!req.user || !req.order) {
    //     throw new ForbiddenError();
    // }
    // // if (req?.user?.id !== "123456789") {
    // // undefined !== undefined -> false
    // if (req.user.id !== req.order.customerId) {
    //     throw new ForbiddenError();
    // }

    next();
};
