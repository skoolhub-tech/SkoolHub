/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (assignment) => {
  const client = createClient();
  try {
    const {
      name, dueDate, instructions, assignmentId,
    } = assignment;
    const query = `UPDATE assignments
    SET name = $1, due_date = $2, instructions = $3
    WHERE id = $4
    RETURNING name, due_date, instructions`;
    const values = [name, dueDate, instructions, assignmentId];
    await client.connect();
    const { rows } = await client.query(query, values);
    return rows[0];
  } catch (err) {
    console.error('error creating class: ', err);
    throw err;
  } finally {
    await client.end();
  }
};
