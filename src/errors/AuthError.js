import ApiError from "./ApiError.js";

class AuthError extends ApiError {
    constructor({ code, message, statusCode, details }) {
        super({ code, message, details, statusCode });
    }
}

class UnAuthenticateError extends AuthError {
    constructor() {
        super({
            code: "UNAUTHENTICATED",
            message: "Authentication required",
            statusCode: 401,
        });
    }
}

class ForbiddenError extends AuthError {
    constructor() {
        super({
            code: "FORBIDDEN",
            message: "You are not allowed to access this resource",
            statusCode: 403,
        });
    }
}

export { UnAuthenticateError, ForbiddenError };
