/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (classId, studentId) => {
  const client = createClient();
  try {
    const query = 'SELECT sa.* FROM students_assignments sa JOIN assignments a ON sa.assignment_id = a.id WHERE a.class_id = $1 AND sa.student_id = $2';
    await client.connect();
    const { rows } = await client.query(query, [classId, studentId]);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};
