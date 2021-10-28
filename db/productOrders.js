const client = require("./client");

// createProductOrder
async function createProductOrder({
  product_id,
  order_id,
  purchase_price,
  quantity,
}) {
  try {
    const resp = await client.query(
      `
        INSERT INTO "products_orders" (product_id,order_id,purchase_price,quantity)
        VALUES ($1,$2,$3,$4)
        RETURNING *;
      `,
      [product_id, order_id, purchase_price, quantity]
    );
    const order = resp.rows[0];
    return order;
  } catch (error) {
    throw error;
  }
}
// createProductOrder({
//   product_id: 2,
//   order_id: 2,
//   purchase_price: 124.0,
//   quantity: 8,
// }).then(console.log);

// getAllProductOrders
async function getAllProductOrders() {
  try {
    const resp = await client.query(
      `
      SELECT * FROM "products_orders"
      `
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
}
// getAllProductOrders().then(console.log);

// getProductOrderById
async function getProductOrderById(id) {
  try {
    const resp = await client.query(
      `
      SELECT * FROM "products_orders"
      WHERE id = $1
      `,
      [id]
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
}
// getProductOrderById(2).then(console.log);

// getProductOrderByProductId
async function getProductOrderByProductId(product_id) {
  try {
    const resp = await client.query(
      `
      SELECT * FROM "products_orders"
      WHERE "product_id" = $1
      `,
      [product_id]
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
}
// getProductOrderByProductId(1).then(console.log);

// getProductOrderOrderId
async function getProductOrderByOrderId(order_id) {
  try {
    const resp = await client.query(
      `
      SELECT * FROM "products_orders"
      WHERE "order_id" = $1
      `,
      [order_id]
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
}
// getProductOrderByOrderId(1).then(console.log);
module.exports = {
  createProductOrder,
  getAllProductOrders,
  getProductOrderById,
  getProductOrderByOrderId,
  getProductOrderByProductId,
};
