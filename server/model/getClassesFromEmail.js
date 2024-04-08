/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (email) => {
  const client = createClient();
  try {
    const query = `SELECT classes.name, classes.id
    FROM classes
    JOIN classes_students ON classes_students.class_id = classes.id
    JOIN students ON students.id = classes_students.student_id
    WHERE students.email = $1`;
    const values = [email];
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
