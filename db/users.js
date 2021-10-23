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
getUserByEmail("bob@aol.com").then(console.log);
//  Create a patch function to update users

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
};
