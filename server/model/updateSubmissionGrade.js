/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (submission) => {
  const client = createClient();
  try {
    console.log(`submission: ${JSON.stringify(submission)}`);
    const {
      grade, score, totalPoints, feedback, submissionId,
    } = submission;
    const query = `UPDATE students_assignments
    SET grade = $1, score = $2, total_points = $3, feedback = $4
    WHERE id = $5
    RETURNING grade, score, total_points, feedback, id`;
    const values = [grade, score, totalPoints, feedback, submissionId];
    await client.connect();
    const { rows } = await client.query(query, values);
    return rows[0];
  } catch (err) {
    console.error('error creating class: ', err);
    throw err;
  } finally {
    await client.end();
  }
};
