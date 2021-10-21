const client = require("../db/client");

async function createTables() {
  try {
    await client.query(`
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL
        )
        
        `);
  } catch (error) {
    throw error;
  }
}
