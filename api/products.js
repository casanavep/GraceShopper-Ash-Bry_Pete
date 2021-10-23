const express = require("express");
const { createProduct, getProducts } = require("../db");
const express = require("express");
const { response } = require("express");
const {
  getProductByTitle,
  getProductById,
  getProductByCategoryId,
} = require("../db/products");
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
productsRouter.post("/", async (req, res) => {
  try {
    const { title, description, price, quantity, category_id } = req.body;
    const user = await createProduct({
      title,
      description,
      price,
      quantity,
      category_id,
    });
    //console.log(user);
    res.send({ order: order });
  } catch (error) {
    res.status(401).send("product add failed");
  }
});

// getProductByTitle
productsRouter.get("/title/:title", async (req, res, next) => {
  const { title } = req.params;
  try {
    const resp = await getProductByTitle(title);
    res.send(resp);
  } catch (error) {
    throw error;
  }
});
// getProductById
productsRouter.get("/productid/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const resp = await getProductById(id);
    res.send(resp);
  } catch (error) {
    throw error;
  }
});
// getProductByCategoryId
productsRouter.get("/category/:category_id", async (req, res, next) => {
  const { category_id } = req.params;
  try {
    const resp = await getProductByCategoryId(category_id);
    res.send(resp);
  } catch (error) {
    throw error;
  }
});
module.exports = productsRouter;
