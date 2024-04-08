const createClient = require('../database/db');

module.exports = async (studentId) => {
  const client = createClient();
  try {
    const query = 'SELECT c.name AS class, t.name AS name, t.email AS email FROM students s JOIN classes_students cs ON s.id = cs.student_id JOIN classes c ON cs.class_id = c.id JOIN teachers t ON c.teacher_id = t.id WHERE s.id = $1';
    const values = [studentId];
    await client.connect();
    const { rows } = await client.query(query, values);
    return rows;
  } catch (err) {
    console.error(`Error getting classes and teachers for student: ${err}`);
    throw err;
  } finally {
    await client.end();
  }
};
