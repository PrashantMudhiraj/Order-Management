const store = new Map();

/**
 * Sliding window approximation:
 *  - Store timestamps
 *  - remove old timestamps
 *  - check count
 */
export function checkAndIncrement(key, limit, windowMs) {
    const now = Date.now();

    if (!store.has(key)) {
        store.set(key, []);
    }

    const timestamps = store.get(key);

    while (timestamps.length && timestamps[0] <= now - windowMs) {
        timestamps.shift();
    }

    if (timestamps.length >= limit) {
        return false;
    }

    timestamps.push(now);

    return true;
}
