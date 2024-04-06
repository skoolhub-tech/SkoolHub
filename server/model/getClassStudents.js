/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (classId) => {
  const client = createClient();
  try {
    const query = 'SELECT s.* FROM students s JOIN classes_students cs ON s.id = cs.student_id WHERE cs.class_id = $1';
    await client.connect();
    const { rows } = await client.query(query, [classId]);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};
