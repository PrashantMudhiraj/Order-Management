import { rateLimit } from "./rateLimit.js";

export const userRateLimit = rateLimit({
    keyGenerator: (req) => req.user.id,
    limit: 1000,
    windowMs: 60_000,
});
