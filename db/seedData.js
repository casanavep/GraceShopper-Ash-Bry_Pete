const client = require("../db/client");

async function createTables() {
  try {
    await client.query(`
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL,
            description VARCHAR(255),
            price DEC (8,2),
            quantity INT NOT NULL,
            categoryId INT REFERENCES categories(id)
            photoId

        );

        CREATE TABLE categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        );

        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            admin BOOLEAN NOT NULL DEFAULT false,
            country VARCHAR(255) NOT NULL,
            fullname VARCHAR(255) NOT NULL,
            phone INT UNIQUE NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip INT NOT NULL,
        );

        CREATE TABLE order (
            id SERIAL PRIMARY KEY,
            userId INT REFERENCES users(id),
            status VARCHAR(255) NOT NULL DEFAULT "cart"

        );

        CREATE TABLE products_order (
            id SERIAL PRIMARY KEY,
            productId INT REFERENCES products(id),
            orderId INT REFERENCES order(id),
            purchaseprice DEC (8,2) NOT NULL,
            quantity INT NOT NULL
        );

        CREATE TABLE reviews (
            id SERIAL PRIMARY KEY,
            productId INT REFERENCES products(id),
            userId INT REFERENCES users(id),
            review VARCHAR(255) NOT NULL,
            rating INT NOT NULL

        );
        
        `);
  } catch (error) {
    throw error;
  }
}
