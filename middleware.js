const express = require("express");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const apiRouter = require("./api/api");
const client = require("./db/client");
const { getUserByEmail } = require("./db");

const server = express();

server.use(cors());
server.use(express.json());

// server.use(async (req, res, next) => {
//   const token = req.headers.authorization
//     ? req.headers.authorization.split(" ")[1]
//     : null;
//   if (!token) {
//     return next();
//   }
//   const login = jwt.verify(token, process.env.JWT_SECRET);
//   const user = await getUserByEmail(login.username);
//   delete user.password;
//   req.user = user;
//   next();
// });

server.use("/api", apiRouter);

server.listen(process.env.PORT, () => {
  //   client.connect();
  console.log("The middleware server is up on port 3000");
});
