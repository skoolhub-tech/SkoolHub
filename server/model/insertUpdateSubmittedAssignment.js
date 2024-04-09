/* eslint-disable no-console */
const createClient = require('../database/db');
const { format } = require('date-fns'); // Assuming you're open to using an external library for date formatting

module.exports = async (
  studentId,
  assignmentId,
  filePath,
  score = null,
  totalPoints = null,
  grade = null,
  completed = true,
) => {
  const client = createClient();
  try {
    const currentDateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const query = `INSERT INTO students_assignments (student_id, assignment_id, file_path, submitted_on, score, total_points, grade, completed)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (student_id, assignment_id)
    DO UPDATE SET
      file_path = EXCLUDED.file_path,
      submitted_on = EXCLUDED.submitted_on,
      score = EXCLUDED.score,
      total_points = EXCLUDED.total_points,
      grade = EXCLUDED.grade,
      completed = EXCLUDED.completed;`;
    const values = [
      studentId,
      assignmentId,
      filePath,
      currentDateTime,
      score,
      totalPoints,
      grade,
      completed,
    ];

    await client.connect();
    const { rows } = await client.query(query, values);
    return rows;
  } catch (err) {
    console.error(`error inserting or updating submitted assignment: ${err}`);
    throw err;
  } finally {
    await client.end();
  }
};
