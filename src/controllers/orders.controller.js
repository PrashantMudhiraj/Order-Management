import { fetchOrders } from "../services/orders.service.js";

export async function getOrders(req, res, next) {
    try {
        const result = await fetchOrders(req.query);

        res.status(200).json({
            data: result.orders,
            meta: {
                limit: result.limit,
                nextCursor: result.nextCursor,
            },
        });
    } catch (err) {
        next(err);
    }
}
