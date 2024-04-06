/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (studentEmail) => {
  const client = createClient();
  try {
    const query = 'SELECT id FROM students WHERE email = $1';
    const values = [studentEmail];
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
