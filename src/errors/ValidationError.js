import ApiError from "./ApiError.js";

export default class ValidationError extends ApiError {
    constructor(fieldErrors) {
        super({
            code: "VALIDATION_ERROR",
            message: "Request validation failed",
            statusCode: 400,
            details: {
                fields: fieldErrors,
            },
        });
    }
}
