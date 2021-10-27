const express = require("express");
const { response } = require("express");
const {
  getProductByTitle,
  getProductById,
  getProductByCategoryId,
  getProducts,
  createProduct,
} = require("../db/products");
const productsRouter = require("express").Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await getProducts();
    res.send(products);
  } catch (error) {
    res.send(error);
  }
});
productsRouter.post("/", async (req, res) => {
  try {
    const { title, description, price, quantity, category_id } = req.body;
    const product = await createProduct({
      title,
      description,
      price,
      quantity,
      category_id,
    });
    //console.log();
    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

// getProductByTitle
productsRouter.get("/title/:title", async (req, res, next) => {
  const { title } = req.params;
  try {
    const resp = await getProductByTitle(title);
    if (resp.length === 0) {
      res.send("No search results found");
    } else {
      res.send(resp);
    }
  } catch (error) {
    res.send(error);
  }
});
// getProductById
productsRouter.get("/productid/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const resp = await getProductById(id);
    if (resp.length === 0) {
      res.send("No search results found");
    } else {
      res.send(resp);
    }
  } catch (error) {
    res.send(error);
  }
});
// getProductByCategoryId
productsRouter.get("/category/:category_id", async (req, res, next) => {
  const { category_id } = req.params;
  try {
    const resp = await getProductByCategoryId(category_id);
    if (resp.length === 0) {
      res.send("No search results found");
    } else {
      res.send(resp);
    }
  } catch (error) {
    res.send(error);
  }
});
module.exports = productsRouter;
