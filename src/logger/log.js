import { logger } from "./logger.js";
import { asyncLocalStorage } from "./asyncLocalStorage.js";

export function log(level, message, meta = {}) {
    const store = asyncLocalStorage.getStore();

    logger.log(level, message, {
        requestId: store?.requestId,
        ...meta,
    });
}
