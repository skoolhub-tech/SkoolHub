const createClient = require('../database/db');

module.exports = async (email) => {
  const client = createClient();
  try {
    const query = `
    WITH teacher_query AS (
      SELECT t.id, t.email, c.id AS class_id, c.name AS class_name
      FROM teachers t
      JOIN classes c ON t.id = c.teacher_id
      WHERE t.email = $1
    ),
    student_query AS (
      SELECT s.id, s.email, cs.class_id, c.name AS class_name
      FROM students s
      JOIN classes_students cs ON s.id = cs.student_id
      JOIN classes c ON cs.class_id = c.id
      WHERE s.email = $1
    )
    SELECT * FROM teacher_query
    UNION ALL
    SELECT * FROM student_query;
    `;
    const values = [email];
    await client.connect();
    const { rows } = await client.query(query, values);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
};
