import ApiError from "../errors/ApiError.js";
import { checkAndIncrement } from "../utils/rateLimitStore.js";

export function rateLimit({ keyGenerator, limit, windowMs }) {
    return (req, res, next) => {
        const key = keyGenerator(req);

        const isAllowed = checkAndIncrement(key, limit, windowMs);

        if (!isAllowed) {
            res.set("Retry-After", Math.ceil(windowMs / 1000));

            return next(
                new ApiError({
                    statusCode: 429,
                    code: "RATE_LIMIT_EXCEEDED",
                    message: "Too many requests, Please try again later",
                }),
            );

            next();
        }
    };
}
