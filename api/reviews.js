const express = require("express");
const { createReview, getReviews } = require("../db");
const express = require("express");
const { response } = require("express");
const reviewsRouter = require("express").Router();

reviewsRouter.get("/", async (req, res) => {
  try {
    const reviews = await getReviews();
    res.send(reviews);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});
reviewsRouter.post("/add", async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId } = req.body;
    const user = await createReview({
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
module.exports = reviewsRouter;
