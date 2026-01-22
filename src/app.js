import express from "express";
import ordersRoutes from "./routes/orders.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import authenticate from "./middlewares/authenticate.js";
import authorizeAdmin from "./middlewares/authorizeAdmin.js";
import ipRateLimit from "./middlewares/ipRateLimit.js";
import userRateLimit from "./middleware/useRateLimit.js";

const app = express();

app.use(ipRateLimit);
// app.use(authenticate);
app.use(userRateLimit);

app.use("/", (req, res, next) => {
    console.log(req.url);
    next();
});

//sample request
//http://localhost:4000/api/orders?status=paid&customerId=123&createdAfter=2026-01-01T00:00:00Z&limit=10&sort=createdAt&direction=asc&cursor=2026-01-01T01:01:00Z
app.use("/api/orders", authorizeAdmin, ordersRoutes);

app.use(errorHandler);

app.listen(4000, () => {
    console.log("App listening on port 4000");
});
