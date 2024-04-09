const createClient = require('../database/db');

module.exports = async (role, data) => {
  let table;
  if (role === 3) {
    table = 'students_calendar';
  } else if (role === 2) {
    table = 'teachers_calendar';
  } else if (role === 1) {
    table = 'admin_calendar';
  }
  const client = createClient();
  try {
    const query = `DELETE FROM ${table} WHERE id = $1`;
    const values = [data.id];
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
