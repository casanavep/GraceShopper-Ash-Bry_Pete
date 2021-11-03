const client = require("./client");
const faker = require("faker");
const { createUser } = require("./users");

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
            platform VARCHAR(255) NOT NULL,
            console_type VARCHAR(255) UNIQUE NOT NULL 
            
            
        );

        CREATE TABLE products (

            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
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
          phone BIGSERIAL UNIQUE NOT NULL,
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
  let categories = [
    { platform: "PC", console_type: "PC" },
    { platform: "Console", console_type: "XBox" },
    { platform: "Console", console_type: "Playstation" },
    { platform: "Console", console_type: "Nintendo Switch" },
    { platform: "Console", console_type: "Nintendo 64" },
    { platform: "Console", console_type: "Nintendo GameCube" },
    { platform: "Console", console_type: "Sega Dreamcast" },
  ];
  for (let category of categories) {
    await client.query(
      `
    INSERT INTO categories(platform, console_type) VALUES($1, $2)
    
    `,
      [category.platform, category.console_type]
    );
  }

  const products = [
    {
      title: "Mortal Kombat",
      description: "Beat up ficitonal characters. violent. rated M",
      price: 20.99,
      quantity: 50,
      categoryId: 1,
    },
    {
      title: "Mortal Kombat",
      description: "Beat up ficitonal characters. violent. rated M",
      price: 20.99,
      quantity: 50,
      categoryId: 2,
    },
    {
      title: "Mortal Kombat",
      description: "Beat up ficitonal characters. violent. rated M",
      price: 20.99,
      quantity: 50,
      categoryId: 3,
    },
    {
      title: "Mortal Kombat",
      description: "Beat up ficitonal characters. violent. rated M",
      price: 20.99,
      quantity: 50,
      categoryId: 7,
    },
    {
      title: "Mortal Kombat 4",
      description:
        "Beat up ficitonal characters with better graphics. violent. rated M",
      price: 25.99,
      quantity: 50,
      categoryId: 1,
    },
    {
      title: "Mortal Kombat 4",
      description:
        "Beat up ficitonal characters with better graphics. violent. rated M",
      price: 25.99,
      quantity: 50,
      categoryId: 3,
    },
    {
      title: "Mortal Kombat 4",
      description:
        "Beat up ficitonal characters with better graphics. violent. rated M",
      price: 25.99,
      quantity: 50,
      categoryId: 5,
    },
    {
      title: "Mortal Kombat 11",
      description:
        "Beat up ficitonal characters with incredible graphics. very violent and bloody. rated M",
      price: 35.99,
      quantity: 5000,
      categoryId: 3,
    },
    {
      title: "Mortal Kombat 11",
      description:
        "Beat up ficitonal characters with incredible graphics. very violent and bloody. rated M",
      price: 35.99,
      quantity: 5000,
      categoryId: 1,
    },
    {
      title: "Mortal Kombat 11",
      description:
        "Beat up ficitonal characters with incredible graphics. very violent and bloody. rated M",
      price: 25.99,
      quantity: 5000,
      categoryId: 2,
    },
    {
      title: "Mortal Kombat 11",
      description:
        "Beat up ficitonal characters with incredible graphics. very violent and bloody. rated M",
      price: 35.99,
      quantity: 5000,
      categoryId: 4,
    },
    {
      title: "Fallout",
      description:
        "Survive in Southern California 84 years after nuclear fallout. Rated M",
      price: 25.99,
      quantity: 57,
      categoryId: 1,
    },
    {
      title: "Fallout 2",
      description:
        "Survive in Southern Oregon 164 years after nuclear fallout. Rated M",
      price: 30.99,
      quantity: 107,
      categoryId: 1,
    },
    {
      title: "Fallout 3",
      description:
        "Survive in Washington DC 200 years after nuclear fallout. Rated M",
      price: 35.99,
      quantity: 206,
      categoryId: 1,
    },
    {
      title: "Fallout 3",
      description:
        "Survive in Washington DC 200 years after nuclear fallout. Rated M",
      price: 35.99,
      quantity: 203,
      categoryId: 2,
    },
    {
      title: "Fallout 3",
      description:
        "Survive in Washington DC 200 years after nuclear fallout. Rated M",
      price: 35.99,
      quantity: 203,
      categoryId: 3,
    },
    {
      title: "Fallout 4",
      description: "Survive in Boston 210 years after nuclear fallout. Rated M",
      price: 45.99,
      quantity: 203,
      categoryId: 3,
    },
    {
      title: "Fallout 4",
      description: "Survive in Boston 210 years after nuclear fallout. Rated M",
      price: 45.99,
      quantity: 203,
      categoryId: 2,
    },
    {
      title: "Fallout 4",
      description: "Survive in Boston 210 years after nuclear fallout. Rated M",
      price: 45.99,
      quantity: 203,
      categoryId: 1,
    },
    {
      title: "Gears of War",
      description: "Save humanity against a horde of monsters",
      price: 23.99,
      quantity: 63,
      categoryId: 1,
    },
    {
      title: "Gears of War",
      description: "Save humanity against a horde of monsters",
      price: 23.99,
      quantity: 63,
      categoryId: 2,
    },
    {
      title: "Gears of War",
      description: "Save humanity against a horde of monsters",
      price: 23.99,
      quantity: 63,
      categoryId: 3,
    },
    {
      title: "FIFA",
      description: "20 lbs",
      price: 15.5,
      quantity: 300,
      categoryId: 2,
    },
    {
      title: "Gears of War",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },

    {
      title: "NBA 2k",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Call of Duty",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Diablo",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Fortnight",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Overwatch",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Smash Bros",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Star Fox",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "PUBG",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "League of Legends",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Minecraft",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Elder Scrolls",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Apex Legends",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Final Fantasy",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Super Mario",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Mario Kart",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Halo",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "007 Golden Eye",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Zelda",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Sonic",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Crazy taxi",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Half-life",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Resident Evil",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Pokemon",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Animal Crossing",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Sims",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
    },
    {
      title: "Computer",
      description: "it runs",
      price: 150.37,
      quantity: 43,
      categoryId: 3,
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
      email: "pcasanave@gmail.com",
      password: "BAPadmin",
      admin: "true",
      country: "USA",
      fullname: "Pete Casanave",
      phone: 123456789,
      address: "123 Fake St",
      city: "New Orleans",
      state: "LA",
      zip: 70003,
    },
    {
      email: "abussell@gmail.com",
      password: "BAPadmin",
      admin: "true",
      country: "USA",
      fullname: "Ashlee Bussell",
      phone: 987654321,
      address: "123 Fake St",
      city: "New Orleans",
      state: "LA",
      zip: 70003,
    },
    {
      email: "breeves@gmail.com",
      password: "BAPadmin",
      admin: "true",
      country: "USA",
      fullname: "Brian Reeves",
      phone: 132456789,
      address: "123 Fake St",
      city: "New Orleans",
      state: "LA",
      zip: 70003,
    },
  ];

  for (let user of users) {
    await createUser({
      email: user.email,
      password: user.password,
      admin: user.admin,
      country: user.country,
      fullname: user.fullname,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      zip: user.zip,
    });
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
