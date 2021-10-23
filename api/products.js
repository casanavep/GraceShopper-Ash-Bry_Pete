const express = require("express");
const { createProduct, getProducts } = require("../db");
const express = require("express");
const { response } = require("express");
const productsRouter = require("express").Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    res.send(products);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});
productsRouter.post("/add", async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId } = req.body;
    const user = await createProducts({
      title,
      description,
      price,
      quantity,
      categoryId,
    });
    //console.log(user);
    res.send({ order: order });
  } catch (error) {
    res.status(401).send("product add failed");
  }
});

module.exports = productsRouter;
