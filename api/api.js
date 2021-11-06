const express = require("express");
const apiRouter = express.Router();
const cors = require("cors");
const {} = require("../db");

const usersRouter = require("./users");
const productsRouter = require("./products");
// const reviewsRouter = require("./reviews");
const ordersRouter = require("./orders");
const productOrdersRouter = require("./productOrders");

const categoryRouter = require("./categories");

apiRouter.use(cors());
apiRouter.use(express.json());
apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
// apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/productorders", productOrdersRouter);
apiRouter.use("/categories", categoryRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
