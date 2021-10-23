const express = require("express");
const { createProductOrder } = require("../db");
const express = require("express");
const productOrders = require("express").Router();

productOrders.post("/productOrders", async (req, res) => {
  try {
    const { product_id, order_id, purchase_price, quantity } = req.body;
    const user = await createProductOrder({
      product_id,
      order_id,
      purchase_price,
      quantity,
    });
    //console.log(user);
    res.send({ order: order });
  } catch (error) {
    res.status(401).send("order faileds");
  }
});

module.exports = productOrders;
