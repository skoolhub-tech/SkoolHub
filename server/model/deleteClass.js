const createClient = require('../database/db');

module.exports = async (classId) => {
  const client = createClient();
  try {
    const query = `DELETE FROM classes
    WHERE id = $1 RETURNING *`;
    const values = [classId];

    await client.connect();
    const { rows } = await client.query(query, values);
    return rows[0];
  } catch (err) {
    console.error('error deleting class: ', err);
    throw err;
  } finally {
    await client.end();
  }
};
