const createClient = require('../database/db');

module.exports = async (classId, studentId) => {
  const client = createClient();
  try {
    const query = `INSERT INTO classes_students (class_id, student_id)
    VALUES ($1, $2)`;
    const values = [classId, studentId];
    await client.connect();
    const { rows } = await client.query(query, values);
    return rows;
  } catch (err) {
    console.error(`error creating class student: ${err}`);
    throw err;
  } finally {
    await client.end();
  }
};
