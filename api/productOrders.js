const express = require("express");

const { getAllOrders } = require("../db/orders");
const {
  getAllProductOrders,
  getProductOrderByOrderId,
  getProductOrderById,
  getProductOrderByProductId,
  createProductOrder,
} = require("../db/productOrders");
const productOrdersRouter = require("express").Router();

// createProductOrder
productOrdersRouter.post("/", async (req, res) => {
  try {
    const { product_id, order_id, purchase_price, quantity } = req.body;
    const productOrder = await createProductOrder({
      product_id,
      order_id,
      purchase_price,
      quantity,
    });
    //console.log(user);
    res.send(productOrder);
  } catch (error) {
    console.log(error);
    res.status(401).send("order failed");
  }
});

// getAllProductOrders
productOrdersRouter.get("/", async (req, res) => {
  try {
    const orders = await getAllProductOrders();
    res.send(orders);
  } catch (error) {
    res.status(401).send("order get failed");
  }
});
// getProductOrderById
productOrdersRouter.get("/id/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const getOrder = await getProductOrderById(id);
    res.send(getOrder);
  } catch (error) {
    throw error;
  }
});
// getProductOrderByOrderId
productOrdersRouter.get("/orderid/:order_id", async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const getOrder = await getProductOrderByOrderId(order_id);
    res.send(getOrder);
  } catch (error) {
    throw error;
  }
});
// getProductOrderByProductId
productOrdersRouter.get("/productid/:product_id", async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const getOrders = await getProductOrderByProductId(product_id);
    res.send(getOrders);
  } catch (error) {
    throw error;
  }
});
module.exports = productOrdersRouter;
