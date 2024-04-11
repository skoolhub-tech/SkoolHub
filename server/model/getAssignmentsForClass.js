/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (classId) => {
  const client = createClient();
  try {
    const query = `SELECT *
    FROM assignments
    WHERE class_id = $1
    ORDER BY id`;
    const values = [classId];
    await client.connect();
    const { rows } = await client.query(query, values);
    return rows;
  } catch (err) {
    console.error(`error getting assignments: ${err}`);
    throw err;
  } finally {
    await client.end();
  }
};
