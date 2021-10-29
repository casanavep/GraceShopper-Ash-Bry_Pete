const express = require("express");
const { createUser, getUser, getUserById, getUserByEmail } = require("../db");
const userRouter = require("express").Router();
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      admin,
      country,
      fullname,
      phone,
      address,
      city,
      state,
      zip,
    } = req.body;
    if (password.length < 8) {
      return res.status(409).send("password is too short.");
    }
    const user = await createUser({
      email,
      password,
      admin,
      country,
      fullname,
      phone,
      address,
      city,
      state,
      zip,
    });
    //console.log(user);
    res.send(user);
  } catch (error) {
    throw error;
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("getting user information");
    const user = await getUser({ email, password });

    const token = jwt.sign(
      { id: user.id, username: user.email },
      process.env.JWT_SECRET
    );
    res.send({ message: "you are logged in", token: token });
  } catch (error) {
    res.status(409).send("incorrect information");
  }
});
userRouter.get("/me", (req, res) => {
  //console.log(Object.keys(req));
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(404).send("you are not logged in");
  }
});
userRouter.get("/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    const getUser = await getUserByEmail({ username });
    res.send(getUser);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
userRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const getUser = await getUserById(id);
    res.send(getUser);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
module.exports = userRouter;