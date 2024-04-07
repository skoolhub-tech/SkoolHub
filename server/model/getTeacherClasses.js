/* eslint-disable no-console */
const createClient = require('../database/db');

module.exports = async (teacherEmail) => {
  const client = createClient();
  try {
    const query = 'SELECT c.* FROM classes c JOIN teachers t ON c.teacher_id = t.id WHERE t.email = $1';
    await client.connect();
    const { rows } = await client.query(query, [teacherEmail]);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};
