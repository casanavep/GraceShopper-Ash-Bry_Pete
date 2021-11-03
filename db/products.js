const client = require("./client");

async function createProduct({
  title,
  description,
  price,
  quantity,
  category_id,
}) {
  try {
    const resp = await client.query(
      `
        INSERT INTO products (title,
            description,
            price,
            quantity,
            category_id)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *;
      `,
      [title, description, price, quantity, category_id]
    );
    const product = resp.rows[0];
    return product;
  } catch (error) {
    throw error;
  }
}
// createProduct({
//   title: "faster car",
//   description: "second fastest car in all of Mexico",
//   price: 99.0,
//   quantity: 4,
//   category_id: 1,
// }).then(console.log);

async function getProductByTitle(title) {
  try {
    const resp = await client.query(
      `
      SELECT * FROM products
      WHERE lower(title) LIKE $1
      `,
      [`%` + title + `%`]
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
}
// getProductByTitle("muffler").then(console.log);
async function getProducts() {
  try {
    const resp = await client.query(
      `
      SELECT * FROM products
      `
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
}
// getProducts().then(console.log);

// getProductById
async function getProductById(id) {
  try {
    const resp = await client.query(
      `
      SELECT * FROM products
      WHERE id = $1
      `,
      [id]
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
}
// getProductById(4).then(console.log);

// getProductByCategoryId
async function getProductByCategoryId(category_id) {
  try {
    const resp = await client.query(
      `
        SELECT * FROM products
        WHERE category_id = $1
        `,
      [category_id]
    );
    return resp.rows;
  } catch (error) {
    throw error;
  }
}
// getProductByCategoryId(1).then(console.log);

async function destroyProducts(id) {
  try {
    // console.log("destroying product_order");
    await client.query(
      `
    DELETE FROM products_orders WHERE product_id = $1
    RETURNING *;
    `,
      [id]
    );
    // console.log("destroying product");
    const resp = await client.query(
      `
    DELETE FROM products WHERE id = $1
    RETURNING *;
    `,
      [id]
    );
    // console.log("finsihed");
  } catch (error) {
    throw error;
  }
}
// destroyProducts(1).then(console.log);

//need to add patches
module.exports = {
  getProducts,
  getProductByTitle,
  getProductById,
  createProduct,
  getProductByCategoryId,
  destroyProducts,
};
