/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async () => {
  const client = createClient();
  try {
    const query = 'SELECT * FROM students';
    await client.connect();
    const { rows } = await client.query(query);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};
