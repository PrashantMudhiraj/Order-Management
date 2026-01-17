import ValidationError from "../errors/ValidationError.js";

export function buildCursorPagination(
    query,
    sortField,
    sortDirection,
    filters = {},
) {
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
    filters.createdAt = filters.createdAt || {};

    if (sortDirection === "desc") {
        // move downward (older)
        filters.createdAt.$lt = cursorDate;
    } else if (sortDirection === "asc") {
        // move upward (newer)
        filters.createdAt.$gt = cursorDate;
    } else {
        throw new ValidationError({
            sort: "Invalid sort direction",
        });
    }

    return { limit, filters };
}
