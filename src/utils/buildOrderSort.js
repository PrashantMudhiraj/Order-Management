import ValidationError from "../errors/ValidationError.js";

const ALLOWED_SORT_FILTER = {
    createdAt: "createdAt",
    totalAmount: "totalAmount",
    status: "status",
};

// required field(sort) and direction
export function buildOrderSort(query) {
    const field = query.sort || "createdAt";
    const direction = query.direction || "desc";

    if (!ALLOWED_SORT_FILTER[field]) {
        throw new ValidationError({
            sort: "Invalid sort field",
        });
    }

    if (!["asc", "desc"].includes(direction)) {
        throw new ValidationError({
            direction: "Must be asc or desc",
        });
    }

    return {
        [ALLOWED_SORT_FILTER[field]]: direction === "asc" ? 1 : -1,
    };
}
