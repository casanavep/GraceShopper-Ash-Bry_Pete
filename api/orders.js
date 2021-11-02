const {
  getAllOrdersByUser,
  getOrderByOrderId,
  getAllOrders,
  createOrder,
} = require("../db/orders");
const ordersRouter = require("express").Router();

ordersRouter.post("/", async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const order = await createOrder(user_id);
    res.send(order);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
// keep getting error: invalid input syntax for type integer: "{"user_id":2}"
// getAllOrders
ordersRouter.get("/", async (req, res, next) => {
  try {
    const getOrders = await getAllOrders();
    res.send(getOrders);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
// getOrderByOrderId
ordersRouter.get("/orderid/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const getOrder = await getOrderByOrderId(id);
    if (!getOrder) {
      return res.status(404).send(`The order ID ${id} does not exist`);
    }
    res.send(getOrder);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
// getting error: invalid input syntax for type integer: "{"id":"3"}"
// getAllOrdersByUser
ordersRouter.get("/userid/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const getOrder = await getAllOrdersByUser(user_id);
    if (getOrder[0] == null) {
      return res.status(404).send(`The user ID ${user_id} does not exist`);
    }
    res.send(getOrder);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = ordersRouter;
