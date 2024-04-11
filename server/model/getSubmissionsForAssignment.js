/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (assignmentId) => {
  const client = createClient();
  try {
    const query = `SELECT
    students.name AS student_name,
    students.email AS student_email,
    students.id AS student_id,
    assignments.id AS assignment_id,
    students_assignments.submitted_on,
    students_assignments.score,
    students_assignments.total_points,
    students_assignments.grade,
    students_assignments.id AS submission_id,
    students_assignments.file_path,
    students_assignments.feedback
    FROM students_assignments
    JOIN students ON students.id = students_assignments.student_id
    JOIN assignments ON assignments.id = students_assignments.assignment_id
    WHERE students_assignments.assignment_id = $1
    ORDER BY students.name`;
    const values = [assignmentId];
    await client.connect();
    const { rows } = await client.query(query, values);
    return rows;
  } catch (err) {
    console.error(`error getting assignment due date: ${err}`);
    throw err;
  } finally {
    await client.end();
  }
};
