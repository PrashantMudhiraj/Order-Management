export default class ApiError extends Error {
    constructor({ code, message, details, statusCode }) {
        super(message);
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
        this.details = details;
    }
}
