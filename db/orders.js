const client = require("./client");

// createOrder
async function createOrder(user_id) {
  try {
    const resp = await client.query(
      `
        INSERT INTO orders
        VALUES ($1)
        RETURNING *;
      `,
      [user_id]
    );
    const order = resp.rows[0];
    return order;
  } catch (error) {
    throw error;
  }
}
// getAllOrders
async function getAllOrders() {
  // console.log("Creating Users");
  try {
    const resp = await client.query(
      `
        SELECT * FROM orders
      `
    );
    const orders = resp.rows[0];
    return orders;
  } catch (error) {
    throw error;
  }
}
// getOrderByOrderId
async function getOrderByOrderId(id) {
  try {
    const resp = await client.query(
      `
      SELECT * FROM orders
      WHERE id = $1
      `,
      [id]
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
}
// getAllOrdersByUser
async function getAllOrdersByUser(user_id) {
  try {
    const resp = await client.query(
      `
      SELECT * FROM orders
      WHERE user_id = $1
      `,
      [user_id]
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createOrder,
  getAllOrders,
  getOrderByOrderId,
  getAllOrdersByUser,
};
