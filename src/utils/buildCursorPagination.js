import ValidationError from "../errors/ValidationError.js";

export function buildCursorPagination(
    query,
    sortField,
    sortDirection,
    filters = {},
) {
    const cursorFilters = { ...filters };
    const limit = Math.min(Number(query.limit) || 20, 50);

    if (Number.isNaN(limit) || limit <= 0) {
        throw new ValidationError({
            limit: "Must be a positive number",
        });
    }

    if (!query.cursor) {
        return { limit, filters };
    }

    const cursorDate = new Date(query.cursor);

    if (Number.isNaN(cursorDate.getTime())) {
        throw new ValidationError({
            cursor: "Invalid cursor value",
        });
    }

    // ensure createdAt exists
    cursorFilters.createdAt = cursorFilters.createdAt || {};

    if (sortDirection === "desc") {
        // move downward (older)
        cursorFilters.createdAt.$lt = cursorDate;
    } else if (sortDirection === "asc") {
        // move upward (newer)
        cursorFilters.createdAt.$gt = cursorDate;
    } else {
        throw new ValidationError({
            sort: "Invalid sort direction",
        });
    }

    return { limit, cursorFilters };
}

/**
 * createdAfter → $gt, createdBefore → $lt
 * ASC → cursor uses $gt, DESC → cursor uses $lt
 */

//2026-01-01T00:00:00Z - createdAfter
//2026-01-01T01:00:00Z
//2026-01-01T02:00:00Z
//2026-01-01T03:00:00Z
//2026-01-01T04:00:00Z
//2026-01-01T05:00:00Z

//sort desc -> top(newer) - bottom(old)
//2026-01-01T05:00:00Z
//2026-01-01T04:00:00Z
//2026-01-01T03:00:00Z -> cursor ($lt)
//2026-01-01T02:00:00Z
//2026-01-01T01:00:00Z
//2026-01-01T00:00:00Z -> createdAfter ($gt)

//sort asc  -> top(old) - bottom(newer)
//2026-01-01T00:00:00Z - createdAfter ($gt) - deleted
//2026-01-01T01:00:00Z
//2026-01-01T02:00:00Z
//2026-01-01T03:00:00Z - cursor($gt) - merged (client already seen top 3 records)
//2026-01-01T04:00:00Z
//2026-01-01T05:00:00Z
