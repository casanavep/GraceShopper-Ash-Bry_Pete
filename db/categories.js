const client = require("./client");

async function getAllCategories() {
  try {
    const resp = await client.query(`
        SELECT * FROM categories;
        `);

    return resp.rows;
  } catch (error) {
    throw error;
  }
}

// getAllCategories().then(console.log);

async function createCategory(platform, console_type) {
  try {
    const resp = await client.query(
      `
        INSERT INTO categories (platform, console_type) VALUES ($1,$2)
        RETURNING *; 
        `,
      [platform, console_type]
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
}
// createCategory("console", "Nintendo Gameboy").then(console.log);

async function getCategoryByID(id) {
  try {
    const resp = await client.query(
      `
        SELECT * FROM categories WHERE id = $1
        `,
      [id]
    );

    return resp.rows[0];
  } catch (error) {
    throw error;
  }
}

// getCategoryByID(7).then(console.log);

async function getCategoryByPlatform(platform) {
  try {
    const resp = await client.query(
      `
        SELECT * FROM categories WHERE lower(platform) LIKE $1
        `,
      [`%` + platform + `%`]
    );

    return resp.rows;
  } catch (error) {
    throw error;
  }
}

// getCategoryByPlatform("nintendo").then(console.log);
async function destroyCategory(id) {
  try {
    await client.query(
      `
    DELETE FROM products WHERE category_id = $1
    RETURNING *
    `,
      [id]
    );

    const resp = await client.query(
      `
    DELETE FROM categories WHERE id=$1
    RETURNING *
    `,
      [id]
    );

    return resp.rows;
  } catch (error) {
    throw error;
  }
}

// destroyCategory(1).then(console.log);
module.exports = {
  getAllCategories,
  createCategory,
  getCategoryByID,
  getCategoryByPlatform,
  destroyCategory,
};
