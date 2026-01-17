// services/orders.service.js
import { buildOrderFilters } from "../utils/buildOrderFilters.js";
import { buildOrderSort } from "../utils/buildOrderSort.js";
import { buildCursorPagination } from "../utils/buildCursorPagination.js";
// import Order from "../db/order.model.js"; // pretend DB model

export async function fetchOrders(query) {
    const filters = buildOrderFilters(query);
    const sort = buildOrderSort(query);

    const [sortField, sortValue] = Object.entries(sort)[0];

    const { limit, cursorFilter } = buildCursorPagination(
        query,
        sortField,
        sortValue === 1 ? "asc" : "desc",
        filters,
    );

    const finalQuery = {
        ...filters,
        ...cursorFilter,
    };

    console.log({ finalQuery, sort, limit });

    // const orders = await Order.find(finalQuery)
    //     .sort(sort)
    //     .limit(limit + 1); // +1 to detect next page

    const orders = [
        { id: 1, createdAt: "1" },
        { id: 2, createdAt: "2" },
        { id: 3, createdAt: "3" },
        { id: 4, createdAt: "4" },
        { id: 5, createdAt: "5" },
        { id: 6, createdAt: "6" },
        { id: 7, createdAt: "7" },
        { id: 8, createdAt: "8" },
        { id: 9, createdAt: "9" },
        { id: 10, createdAt: "10" },
        { id: 11, createdAt: "11" },
    ];

    let nextCursor = null;

    if (orders.length > limit) {
        const last = orders.pop();
        nextCursor = last[sortField];
    }

    return {
        orders,
        limit,
        nextCursor,
    };
}
