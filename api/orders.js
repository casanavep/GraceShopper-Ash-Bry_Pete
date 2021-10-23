const express = require("express");
const {
  getAllOrdersByUser,
  getOrderByOrderId,
  getAllOrders,
  createOrder,
} = require("../db/orders");
const ordersRouter = require("express").Router();

ordersRouter.post("/order", async (req, res) => {
  try {
    const { user_id } = req.body;
    const user = await createOrder({
      user_id,
    });
    //console.log(user);
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
  } catch ({ name, message }) {
    next({ name, message });
  }
});
// getOrderByOrderId
ordersRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const getOrder = await getOrderByOrderId({ id });
    res.send(getOrder);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
// getAllOrdersByUser
ordersRouter.get("/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    const getOrder = await getAllOrdersByUser({ username });
    res.send(getOrder);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = ordersRouter;
