const createClient = require('../database/db');

module.exports = async (classId) => {
  const client = createClient();
  try {
    const query = 'SELECT threshold FROM classes where id = $1';
    const values = [classId];
    await client.connect();
    const { rows } = await client.query(query, values);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
};
