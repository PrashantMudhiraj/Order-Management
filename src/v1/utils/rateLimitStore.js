const store = new Map();

/**
 * Sliding window approximation:
 *  - Store timestamps
 *  - remove old timestamps
 *  - check count
 *
 * A Sliding window is a spot light that is exactly 60 minutes wide. As you move forward in time, the spotlight moves with you. To decide if a new request is allowed, you look inside the spotlight. If there are already 100 requests visible in that light, the new one i blocked. Id doesn't matter if the clock just struct midnight; the spotlight only cares about the last 60 minutes of history from this very second
 *
 * - In production, we use Redis Stored Sets (ZSETs). This is most accurate way to move handle the "moving spotlight"
 */
export function checkAndIncrement(key, limit, windowMs) {
    const now = Date.now();

    if (!store.has(key)) {
        store.set(key, []);
    }

    const timestamps = store.get(key);

    //logic to remove old records
    while (timestamps.length && timestamps[0] <= now - windowMs) {
        timestamps.shift();
    }

    if (timestamps.length >= limit) {
        return false;
    }

    timestamps.push(now);

    return true;
}
