const bcrypt = require("bcrypt");
const client = require("./client");

async function createUser({
  email,
  password,
  admin,
  country,
  fullname,
  phone,
  address,
  city,
  state,
  zip,
}) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const resp = await client.query(
      `
      INSERT INTO users (email,password,admin,country,fullname,phone,address,city,state,zip)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `,
      [
        email,
        hashedPassword,
        admin,
        country,
        fullname,
        phone,
        address,
        city,
        state,
        zip,
      ]
    );
    const user = resp.rows[0];
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

// createUser({
//   email: "bob@aol.com",
//   password: "dddddddddd",
//   admin: false,
//   country: "us",
//   fullname: "Bob Eubanks",
//   phone: 1235551234,
//   address: "101 My House",
//   city: "Austin",
//   state: "TX",
//   zip: 78613,
// }).then(console.log);

async function getUser({ email, password }) {
  // console.log("Getting User");
  try {
    const resp = await client.query(
      `
    SELECT * FROM users
    WHERE email = $1
    `,
      [email]
    );
    const user = resp.rows[0];

    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
}
// getUser({
//   email: "bob@aol.com",
//   password: "dddddddddd",
// }).then(console.log);

async function getAllUsers() {
  try {
    const resp = await client.query(`
    SELECT * FROM users;
    `);

    return resp.rows;
  } catch (error) {
    throw error;
  }
}

// getAllUsers().then(console.log);

async function getUserById(id) {
  // console.log("Getting User By ID");
  try {
    const resp = await client.query(
      `
    SELECT * FROM users
    WHERE id = $1
    `,
      [id]
    );
    delete resp.rows[0].password;
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
}
// getUserById(4).then(console.log);
async function getUserByEmail(email) {
  // console.log("Getting User By ID");
  try {
    const resp = await client.query(
      `
    SELECT * FROM users
    WHERE email = $1
    `,
      [email]
    );
    delete resp.rows[0].password;
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
}
// getUserByEmail("bob@aol.com").then(console.log);

async function destroyUser(id) {
  try {
    // console.log("destroying order");
    await client.query(
      `
    DELETE FROM orders WHERE user_id = $1
    `,
      [id]
    );
    // console.log("destroying user");
    const {
      rows: [user],
    } = await client.query(
      `
      DELETE FROM users WHERE id = $1
      RETURNING *;
    `,
      [id]
    );
    // console.log("finished");
    return user;
  } catch (error) {
    throw error;
  }
}
// destroyUser(3).then(console.log);

async function updateUser({
  id,
  email,
  password,
  admin,
  country,
  fullname,
  phone,
  address,
  city,
  state,
  zip,
  active,
}) {
  try {
    if (email != undefined) {
      await client.query(
        `
      UPDATE users
      SET email = $1
      WHERE id = $2
      `,
        [email, id]
      );
    }
    if (password != undefined) {
      await client.query(
        `
      UPDATE users
      SET pasword = $1
      WHERE id = $2
      `,
        [password, id]
      );
    }
    if (admin != undefined) {
      await client.query(
        `
      UPDATE users
      SET admin = $1
      WHERE id = $2
      `,
        [admin, id]
      );
    }
    if (country != undefined) {
      await client.query(
        `
      UPDATE users
      SET country = $1
      WHERE id = $2
      `,
        [country, id]
      );
    }
    if (fullname != undefined) {
      await client.query(
        `
      UPDATE users
      SET fullname = $1
      WHERE id = $2
      `,
        [fullname, id]
      );
    }
    if (phone != undefined) {
      await client.query(
        `
      UPDATE users
      SET phone = $1
      WHERE id = $2
      `,
        [phone, id]
      );
    }
    if (address != undefined) {
      await client.query(
        `
      UPDATE users
      SET address = $1
      WHERE id = $2
      `,
        [address, id]
      );
    }
    if (city != undefined) {
      await client.query(
        `
      UPDATE users
      SET city = $1
      WHERE id = $2
      `,
        [city, id]
      );
    }
    if (state != undefined) {
      await client.query(
        `
      UPDATE users
      SET state = $1
      WHERE id = $2
      `,
        [state, id]
      );
    }
    if (zip != undefined) {
      await client.query(
        `
      UPDATE users
      SET zip = $1
      WHERE id = $2
      `,
        [zip, id]
      );
    }
    if (active != undefined) {
      await client.query(
        `
      UPDATE users
      SET email = $1
      WHERE id = $2
      `,
        [active, id]
      );
    }

    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users WHERE id=$1
    `,
      [id]
    );
    return user;
  } catch (error) {
    throw error;
  }
}
// updateUser({ id: 3, email: "brian@aol.com", city: "Baton Rouge" }).then(
//   console.log
// );
module.exports = {
  destroyUser,
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
};
