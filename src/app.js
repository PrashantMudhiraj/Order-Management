import express from "express";
import swaggerUi from "swagger-ui-express";
import { openApiSpec } from "./docs/swagger.js";
import ordersRoutes from "./routes/v1/orders.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import authenticate from "./middlewares/authenticate.js";
import authorizeAdmin from "./middlewares/authorizeAdmin.js";
import { ipRateLimit } from "./middlewares/ipRateLimit.js";
import { userRateLimit } from "./middlewares/userRateLimit.js";
import { log } from "./logger/log.js";
import { asyncLocalStorage } from "./logger/asyncLocalStorage.js";
import { randomUUID } from "crypto";
// import rateLimit from "express-rate-limiter"; //external package for rateLimiting

// const limiter = rateLimit({
//     windowMs: 60 * 60 * 100,
//     limit: 200,
//     message: "Too Many request, Please try again later",
// });

const app = express();

app.set("trust proxy", 1);

// app.use(ipRateLimit);
// // app.use(authenticate);
// app.use(userRateLimit);
// src/app.js

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(openApiSpec, {
        explorer: true,
        swaggerOptions: {
            persistAuthorization: true,
        },
    }),
);

app.use((req, res, next) => {
    asyncLocalStorage.run({ requestId: randomUUID() }, () => next());
});

//sample request
//http://localhost:4000/api/orders?status=paid&customerId=123&createdAfter=2026-01-01T00:00:00Z&limit=10&sort=createdAt&direction=asc&cursor=2026-01-01T01:01:00Z
app.use("/api/orders", authorizeAdmin, ordersRoutes);

app.use(errorHandler);

app.listen(4000, () => {
    console.log("App listening on port 4000");
});
