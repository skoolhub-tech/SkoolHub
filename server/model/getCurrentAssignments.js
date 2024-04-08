const createClient = require('../database/db');

module.exports = async (role, id) => {
  let query;
  if (role === '3') {
    query = `SELECT assignments.id, assignments.name, assignments.class_id, assignments.due_date
      FROM students_assignments
      JOIN assignments ON students_assignments.assignment_id = assignments.id
      WHERE students_assignments.student_id = $1 AND
      (assignments.due_date >= CURRENT_DATE OR students_assignments.completed = false)
      ORDER BY assignments.due_date;`;
  } else if (role === '2') {
    query = `SELECT assignments.id, assignments.name, assignments.class_id, assignments.due_date
      FROM teachers_assignments
      JOIN assignments ON teachers_assignments.assignment_id = assignments.id
      WHERE teachers_assignments.teacher_id = $1 AND assignments.due_date >= CURRENT_DATE
      ORDER BY assignments.due_date;`;
  }

  const client = createClient();

  try {
    const values = [id];
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
