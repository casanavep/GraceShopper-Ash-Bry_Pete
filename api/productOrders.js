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
productOrdersRouter.post("/", async (req, res, next) => {
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
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// getAllProductOrders
productOrdersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllProductOrders();
    res.send(orders);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
// getProductOrderById
productOrdersRouter.get("/id/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const getOrder = await getProductOrderById(id);
    if (!getOrder) {
      return res.status(404).send(`Product order with ID ${id} does not exist`);
    }
    res.send(getOrder);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
// getProductOrderByOrderId
productOrdersRouter.get("/orderid/:order_id", async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const getOrder = await getProductOrderByOrderId(order_id);
    if (!getOrder) {
      return res
        .status(404)
        .send(`Product order with order ID ${order_id} does not exist`);
    }
    res.send(getOrder);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
// getProductOrderByProductId
productOrdersRouter.get("/productid/:product_id", async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const getOrders = await getProductOrderByProductId(product_id);
    if (!getOrders) {
      res
        .status(404)
        .send(`Product order with product ID ${product_id} does not exist`);
    }
    res.send(getOrders);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
module.exports = productOrdersRouter;
