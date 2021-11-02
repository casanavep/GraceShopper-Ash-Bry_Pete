const express = require("express");
const apiRouter = express.Router();
const {} = require("../db");

const usersRouter = require("./users");
const productsRouter = require("./products");
// const reviewsRouter = require("./reviews");
const ordersRouter = require("./orders");
const productOrdersRouter = require("./productOrders");

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
// apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/productorders", productOrdersRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
