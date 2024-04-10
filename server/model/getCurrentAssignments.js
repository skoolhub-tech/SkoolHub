const createClient = require('../database/db');

module.exports = async (role, userId, classId) => {
  let query;
  if (role === '3') {
    query = `SELECT assignments.id, assignments.name, assignments.class_id, assignments.due_date, students_assignments.completed
      FROM students_assignments
      JOIN assignments ON students_assignments.assignment_id = assignments.id
      WHERE students_assignments.student_id = $1 AND
      (assignments.due_date >= CURRENT_DATE OR students_assignments.completed = false)
      ${classId ? 'AND assignments.class_id = $2' : ''}
      ORDER BY assignments.due_date;`;
  } else if (role === '2') {
    query = `SELECT assignments.id, assignments.name, assignments.class_id, assignments.due_date
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
