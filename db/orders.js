const client = require("./client");

// createOrder
async function createOrder(user_id) {
  try {
    const resp = await client.query(
      `
        INSERT INTO orders
        (user_id) VALUES ($1)
        RETURNING *;
      `,
      [user_id]
    );
    const order = resp.rows[0];
    return order;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// createOrder(1).then(console.log);

// getAllOrders
async function getAllOrders() {
  // console.log("Creating Users");
  try {
    const resp = await client.query(
      `
        SELECT * FROM orders
      `
    );
    const orders = resp.rows;
    return orders;
  } catch (error) {
    throw error;
  }
}
// getAllOrders().then(console.log);

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
// getOrderByOrderId(4).then(console.log);

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
// getAllOrdersByUser(2).then(console.log);

async function updateOrder({ id, status }) {
  try {
    const resp = await client.query(
      `
    UPDATE orders
    SET status = $1
    WHERE id = $2
    RETURNING *
    `,
      [status, id]
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
}
// updateOrder({ id: 2, status: "warehouse" }).then(console.log);
module.exports = {
  createOrder,
  getAllOrders,
  getOrderByOrderId,
  getAllOrdersByUser,
  updateOrder,
};
