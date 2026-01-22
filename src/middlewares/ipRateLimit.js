import { rateLimit } from "./rateLimit.js";

export const ipRateLimit = rateLimit({
    keyGenerator: (req) => req.ip,
    limit: 100,
    windowMs: 60_000,
});
