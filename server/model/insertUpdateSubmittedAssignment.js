/* eslint-disable no-console */
const createClient = require('../database/db');

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
    const query = `INSERT INTO students_assignments (student_id, assignment_id, file_path, score, total_points, grade, completed)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (student_id, assignment_id)
    DO UPDATE SET
      file_path = EXCLUDED.file_path,
      score = EXCLUDED.score,
      total_points = EXCLUDED.total_points,
      grade = EXCLUDED.grade,
      completed = EXCLUDED.completed;`;
    const values = [studentId, assignmentId, filePath, score, totalPoints, grade, completed];
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
