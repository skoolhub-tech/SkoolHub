/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (email, password) => {
  const client = createClient();
  try {
    const query = 'SELECT role_id FROM credentials WHERE email = $1 AND password = $2';
    const values = [email, password];
    await client.connect();
    const { rows } = await client.query(query, values);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};
