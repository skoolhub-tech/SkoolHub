/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (assignment) => {
  const client = createClient();
  try {
    const { classId, name, dueDate, instructions, teacherId } = assignment;
    const query = `INSERT INTO assignments (class_id, name, due_date, instructions, teacher_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [classId, name, dueDate, instructions, teacherId];

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
