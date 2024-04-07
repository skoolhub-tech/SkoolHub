/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (classId) => {
  const client = createClient();
  try {
    const query = `SELECT name, id
    FROM assignments
    WHERE class_id = $1`;
    const values = [classId];
    await client.connect();
    const { rows } = await client.query(query, values);
    return rows;
  } catch (err) {
    console.error(`error getting assignment due date: ${err}`);
    throw err;
  } finally {
    await client.end();
  }
};
