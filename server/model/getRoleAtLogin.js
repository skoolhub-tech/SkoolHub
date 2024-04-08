/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (email) => {
  const client = createClient();
  try {
    const query = `SELECT id, name, role_id FROM students WHERE email = $1
    UNION
    SELECT id, name, role_id FROM teachers WHERE email = $1
    UNION
    SELECT id, name, role_id FROM admin WHERE email = $1;`;
    const values = [email];
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
