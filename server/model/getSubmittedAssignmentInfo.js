/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (assignmentId, studentEmail) => {
  const client = createClient();
  try {
    const query = `SELECT submitted_on, score, grade, total_points, teachers.name as teacher_name, feedback
    FROM students_assignments
    JOIN students ON students.id = students_assignments.student_id
    JOIN assignments on assignments.id = students_assignments.assignment_id
    JOIN teachers ON teachers.id = assignments.teacher_id
    WHERE assignment_id = $1 AND students.email = $2`;
    const values = [assignmentId, studentEmail];
    await client.connect();
    const { rows } = await client.query(query, values);
    return rows;
  } catch (err) {
    console.error(`error getting assignments: ${err}`);
    throw err;
  } finally {
    await client.end();
  }
};
