import ApiError from "../errors/ApiError.js";

export default (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            error: {
                code: err.code,
                message: err.message,
                details: err.details,
            },
        });
    }
    console.log(err.message);
    return res.status(500).send({
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
        },
    });
};
