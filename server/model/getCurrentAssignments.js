const createClient = require('../database/db');

module.exports = async (role, userId, classId) => {
  let query;
  if (role === '3') {
    query = `
      SELECT a.id AS assignment_id, a.name AS assignment_name, a.due_date,
        CASE
          WHEN sa.assignment_id IS NULL THEN FALSE
          ELSE TRUE
        END AS is_completed
      FROM students s
      JOIN classes_students cs ON s.id = cs.student_id
      JOIN assignments a ON cs.class_id = a.class_id
      LEFT JOIN students_assignments sa ON a.id = sa.assignment_id AND s.id = sa.student_id
      WHERE s.id = $1 ${classId ? 'AND a.class_id = $2' : ''};`;
  } else if (role === '2') {
    query = `
      SELECT assignments.id, assignments.name, assignments.class_id, assignments.due_date
      FROM assignments
      WHERE assignments.teacher_id = $1 AND assignments.due_date >= CURRENT_DATE
      ${classId ? 'AND assignments.class_id = $2' : ''}
      ORDER BY assignments.due_date;`;
  }

  const client = createClient();

  try {
    let values = [userId];
    if (classId) {
      values = [userId, classId];
    }
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
