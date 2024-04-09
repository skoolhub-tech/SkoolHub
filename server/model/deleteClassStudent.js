const createClient = require('../database/db');

module.exports = async (classId, studentId) => {
  const client = createClient();
  const query = 'DELETE FROM classes_students WHERE class_id = $1 AND student_id = $2';
  const values = [classId, studentId];
  try {
    await client.connect();
    const { rows } = await client.query(query, values);
    return rows;
  } catch (err) {
    console.error(`error deleting class student: ${err}`);
    throw err;
  } finally {
    await client.end();
  }
};
