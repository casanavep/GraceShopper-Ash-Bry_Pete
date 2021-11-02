const express = require("express");
const { createUser, getUser, getUserById, getUserByEmail } = require("../db");
const userRouter = require("express").Router();
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res, next) => {
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
      return res.status(406).send("password is too short.");
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
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );
    //console.log(user);

    res.send({ message: "you are registered", token: token, user: user });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    console.log("getting user information");
    const user = await getUser({ email, password });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );
    res.send({
      message: "you are logged in",

      token: token,
      user: user,
    });
  } catch ({ name, message }) {
    next({ name, message: "username or password is incorrect" });
  }
});
userRouter.get("/me", (req, res) => {
  //console.log(Object.keys(req));
  if (req.user) {
    res.send(req.user);
  } else {
    return res.status(401).send("you are not logged in");
  }
});
userRouter.get("/username/:username", async (req, res, next) => {
  try {
    const email = req.params.username;

    const getUser = await getUserByEmail(email);
    res.send({ getUser });
  } catch ({ name, message }) {
    next({ name, message });
  }
});
userRouter.get("/id/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const getUser = await getUserById(id);
    res.send(getUser);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
module.exports = userRouter;
