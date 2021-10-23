const express = require("express");
const { createOrder } = require("../db");
const express = require("express");
const ordersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../db/users");
const { JWT_SECRET } = "peteBryAsh";

ordersRouter.post("/order", async (req, res) => {
  try {
    const { user_id, product, quantity } = req.body;
    const user = await createOrder({
      username,
      product,
      quantity,
    });
    //console.log(user);
    res.send({ order: order });
  } catch (error) {
    res.status(401).send("username already exists");
  }
});

module.exports = ordersRouter;
