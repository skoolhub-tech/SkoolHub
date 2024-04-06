/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (assignmentId) => {
  const client = createClient();
  try {
    const query = 'SELECT class_id FROM assignments WHERE id = $1';
    const values = [assignmentId];
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
