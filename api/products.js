const express = require("express");
const { response } = require("express");
const {
  getProductByTitle,
  getProductById,
  getProductByCategoryId,
  getProducts,
  createProduct,
  destroyProducts,
  updateProduct,
} = require("../db/products");
const productsRouter = require("express").Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getProducts();
    res.send(products);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
productsRouter.post("/", async (req, res, next) => {
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
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// getProductByTitle
productsRouter.get("/title/:title", async (req, res, next) => {
  const { title } = req.params;
  try {
    const resp = await getProductByTitle(title);
    if (resp.length === 0) {
      return res.status(404).send(`${title} is not a product sold here`);
    } else {
      res.send(resp);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});
// getProductById
productsRouter.get("/productid/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const resp = await getProductById(id);
    if (!resp) {
      res.status(404).send(`No product with the ID ${id} exists`);
    }
    res.send(resp);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
// getProductByCategoryId
productsRouter.get("/category/:category_id", async (req, res, next) => {
  const { category_id } = req.params;
  try {
    const resp = await getProductByCategoryId(category_id);
    if (resp.length === 0) {
      res.status(404).send(`Category with the ID ${category_id} exists`);
    } else {
      res.send(resp);
    }
  } catch ({ name, message }) {
    next(name, message);
  }
});

//delete product
productsRouter.delete("/productid/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const resp = await destroyProducts(id);
    if (!resp) {
      res.status(404).send(`Products with ID ${id} does not exist`);
    }

    res.send(resp);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//update product
productsRouter.patch("/productid/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, description, price, quantity, category_id, active } = req.body;

  try {
    const updatedProduct = await updateProduct({
      id,
      title,
      description,
      price,
      quantity,
      category_id,
      active,
    });
    if (!updatedProduct) {
      res.status(404).send(`Product with ID ${id} does not exist`);
    }
    res.send(updatedProduct);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
module.exports = productsRouter;
