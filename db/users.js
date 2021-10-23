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
      VALUES ($1,$2)
      RETURNING *;
    `,
      [username, hashedPassword]
    );
    const user = resp.rows[0];
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  // console.log("Getting User");
  try {
    const resp = await client.query(
      `
    SELECT * FROM users
    WHERE username = $1
    `,
      [username]
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
async function getUserByEmail(email) {
  // console.log("Getting User By ID");
  try {
    const resp = await client.query(
      `
    SELECT * FROM users
    WHERE username = $1
    `,
      [email]
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
};
