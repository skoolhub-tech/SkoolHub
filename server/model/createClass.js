const createClient = require('../database/db');

module.exports = async (newClassData) => {
  const client = createClient();
  try {
    const { className, teacherId } = newClassData;
    const query = `INSERT INTO classes (name, teacher_id)
    VALUES ($1, $2) RETURNING *`;
    const values = [className, teacherId];

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
