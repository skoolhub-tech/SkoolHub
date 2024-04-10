const createClient = require('../database/db');

module.exports = async (thresholdNumber, classId) => {
  const client = createClient();
  try {
    const query = `UPDATE classes SET threshold = $1 WHERE id = $2`;
    const values = [thresholdNumber, classId];
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
