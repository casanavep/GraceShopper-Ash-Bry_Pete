const {
  getAllOrdersByUser,
  getOrderByOrderId,
  getAllOrders,
  createOrder,
} = require("../db/orders");
const ordersRouter = require("express").Router();

ordersRouter.post("/", async (req, res) => {
  try {
    const { user_id } = req.body;
    const order = await createOrder(user_id);
    res.send(order);
  } catch (error) {
    throw error;
  }
});
// keep getting error: invalid input syntax for type integer: "{"user_id":2}"
// getAllOrders
ordersRouter.get("/", async (req, res, next) => {
  try {
    const getOrders = await getAllOrders();
    res.send(getOrders);
  } catch (error) {
    throw error;
  }
});
// getOrderByOrderId
ordersRouter.get("/orderid/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const getOrder = await getOrderByOrderId(id);
    res.send(getOrder);
  } catch (error) {
    throw error;
  }
});
// getting error: invalid input syntax for type integer: "{"id":"3"}"
// getAllOrdersByUser
ordersRouter.get("/userid/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const getOrder = await getAllOrdersByUser(user_id);
    res.send(getOrder);
  } catch (error) {
    throw error;
  }
});

module.exports = ordersRouter;
