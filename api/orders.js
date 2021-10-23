const express = require("express");
const {
  getAllOrdersByUser,
  getOrderByOrderId,
  getAllOrders,
  createOrder,
} = require("../db/orders");
const ordersRouter = require("express").Router();

ordersRouter.post("/", async (req, res) => {
  try {
    const { user_id } = req.body;
    const user = await createOrder({
      user_id,
    });
    res.send({ order: order });
  } catch (error) {
    res.status(401).send("username already exists");
  }
});
// getAllOrders
ordersRouter.get("/", async (req, res, next) => {
  try {
    const getOrders = await getAllOrders();
    res.send(getOrders);
  } catch (error) {
    throw error;
  }
});
// getOrderByOrderId
ordersRouter.get("/orderid/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const getOrder = await getOrderByOrderId({ id });
    res.send(getOrder);
  } catch (error) {
    throw error;
  }
});
// getAllOrdersByUser
ordersRouter.get("/userid/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const getOrder = await getAllOrdersByUser({ user_id });
    res.send(getOrder);
  } catch (error) {
    throw error;
  }
});

module.exports = ordersRouter;
