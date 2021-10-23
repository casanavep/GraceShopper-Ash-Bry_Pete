const client = require("./client");

async function seedDB() {
  // client.connect();
  await client.query(`  
  DROP TABLE IF EXISTS products_orders;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS categories;
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS users;
  
    
    CREATE TABLE categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        );

        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL,
            description VARCHAR(255),
            price DEC (8,2),
            quantity INT NOT NULL,
            category_id INT REFERENCES categories(id)
            

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
          zip INT NOT NULL
      );

      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        status VARCHAR(255) NOT NULL DEFAULT 'cart'
      );

      
     CREATE TABLE products_orders (
       id SERIAL PRIMARY KEY,
       product_id INT REFERENCES products(id),
       order_id INT REFERENCES orders(id),
       purchase_price DEC (8,2) NOT NULL,
       quantity INT NOT NULL
     )

 
   
        `);

  const categories = [
    { name: "auto" },
    { name: "gym" },
    { name: "electronics" },
  ];

  for (let category of categories) {
    await client.query(
      `
    INSERT INTO categories(name) VALUES($1);
    `,
      [category.name]
    );
  }

  const products = [
    {
      title: "muffler",
      description: "It's a muffler",
      price: 35.99,
      quantity: 150,
      categoryId: 1,
    },
    {
      title: "dumbbells",
      description: "20 lbs",
      price: 15.5,
      quantity: 300,
      categoryId: 2,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
  ];

  for (let product of products) {
    await client.query(
      `
    INSERT INTO products(title, description, price, quantity, category_id) VALUES ($1,$2,$3,$4,$5);
    `,
      [
        product.title,
        product.description,
        product.price,
        product.quantity,
        product.categoryId,
      ]
    );
  }

  const users = [
    {
      email: "saljones@gmail.com",
      password: "password1",
      admin: "false",
      country: "USA",
      fullname: "Sally Jones",
      phone: 123456789,
      address: "123 Fake St",
      city: "New Orleans",
      state: "LA",
      zip: 70032,
    },
    {
      email: "joeblow@hotmail.com",
      password: "password2",
      admin: "true",
      country: "Mexico",
      fullname: "Joseph Blowseph",
      phone: 987654321,
      address: "1234 Fake St",
      city: "Mexico City",
      state: "MX",
      zip: 12345,
    },
    {
      email: "johnsmith@aol.com",
      password: "password3",
      admin: "false",
      country: "Spain",
      fullname: "Johnathan Smith",
      phone: 132456789,
      address: "12 Fake St",
      city: "Madrid",
      state: "Spain",
      zip: 54321,
    },
  ];

  for (let user of users) {
    await client.query(
      `
    INSERT INTO users(email, password, admin,  country, fullname, phone, address, city, state, zip) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9, $10)
    `,
      [
        user.email,
        user.password,
        user.admin,
        user.country,
        user.fullname,
        user.phone,
        user.address,
        user.city,
        user.state,
        user.zip,
      ]
    );
  }

  const orders = [
    { user_id: 1, status: "cart" },
    { user_id: 3, status: "shipped" },
    { user_id: 2, status: "delivered" },
  ];

  for (let order of orders) {
    await client.query(
      `
    INSERT INTO orders(user_id, status) VALUES ($1,$2)
    `,
      [order.user_id, order.status]
    );
  }

  const products_orders = [
    {
      product_id: 2,
      order_id: 3,
      purchase_price: 31.0,
      quantity: 2,
    },
  ];

  for (let products_order of products_orders) {
    await client.query(
      `
    INSERT INTO products_orders(product_id, order_id, purchase_price, quantity) VALUES ($1,$2,$3,$4)
    `,
      [
        products_order.product_id,
        products_order.order_id,
        products_order.purchase_price,
        products_order.quantity,
      ]
    );
  }
  console.log("Database seeded");
}

seedDB();

//     CREATE TABLE reviews (
//         id SERIAL PRIMARY KEY,
//         productId INT REFERENCES products(id),
//         userId INT REFERENCES users(id),
//         review VARCHAR(255) NOT NULL,
//         rating INT NOT NULL

//     );
