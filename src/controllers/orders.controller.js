import { fetchOrders } from "../services/orders.service.js";
import { log } from "../logger/log.js";

export async function getOrders(req, res, next) {
    try {
        log("info", "test", { a: 1 });
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
