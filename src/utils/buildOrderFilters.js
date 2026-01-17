import ValidationError from "../errors/ValidationError.js";

export function buildOrderFilters(query) {
    // const status = ['paid']
    const filters = {};
    if (query.status) {
        // Need to apply validation
        filters.status = query.status;
    }

    if (query.customerId) {
        const customerId = Number(query.customerId);
        if (Number.isNaN(customerId)) {
            throw new ValidationError({ customerId: "Must be a number" });
        }
        filters.customerId = query.customerId;
    }

    if (query.createdAfter || query.createdBefore) {
        filters.createdAt = {};

        if (query.createdAfter) {
            const date = new Date(query.createdAfter);

            if (Number.isNaN(date.getTime())) {
                throw new ValidationError({
                    createdAfter: "Invalid Date format",
                });
            }
            //createdAfter < cursor
            filters.createdAt.$gt = new Date(date); // $gt used because client need data after(newer) this date
            //2026-01-01T00:00:00Z -> createdAfter this date ($gt)
            //2026-01-01T01:00:00Z
            //2026-01-01T02:00:00Z
            //2026-01-01T03:00:00Z -> cursor($lt)
            //2026-01-01T04:00:00Z
            //2026-01-01T05:00:00Z -> cursor($lt)

            //createdAfter(2026-01-01T00:00:00Z)  < cursor(2026-01-01T03:00:00Z)
        }

        if (query.createdBefore) {
            const date = new Date(query.createdBefore);

            if (Number.isNaN(date.getTime())) {
                throw new ValidationError({
                    createdAfter: "Invalid Date format",
                });
            }

            //createdBefore > cursor
            filters.createdAt.$lt = date; // $lt used because client need data before(old) this date
            //2026-01-01T00:00:00Z -> cursor($gt)
            //2026-01-01T01:00:00Z
            //2026-01-01T02:00:00Z
            //2026-01-01T03:00:00Z -> cursor($gt)
            //2026-01-01T04:00:00Z
            //2026-01-01T05:00:00Z -> createdBefore this date($lt)

            //createdBefore(2026-01-01T05:00:00Z)  > cursor(2026-01-01T03:00:00Z)
        }
    }

    return filters;
}

// values are that are greater than cursor and less than createdAfter (createdAfter > cursor)
// data -> 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115
// createdAfter 100 , limit 5
// 100 101 102 103 104
// createdAfter -> 100
// cursor -> 104
// 105 106 107 108 109
// cursor -> 109
// 110 111 112 113 114

// values are that are greater than createdAfter and less than cursor (createdAfter < cursor)
// data -> 114 113 112 111 110 109 108 107 106 105 104 103 102 101 100
// createdAfter 115, limit 5
// 114 113 112 111 110
// createdAfter -> 115
// cursor -> 110
// 109 108 107 106 105
// cursor -> 105
// 104 103 102 101 100
