const createClient = require('../database/db');

module.exports = async (role, id) => {
  let table;
  if (role === '3') {
    table = 'students_calendar';
  } else if (role === '2') {
    table = 'teachers_calendar';
  } else if (role === '1') {
    table = 'admin_calendar';
  }
  console.log(table);
  const client = createClient();
  try {
    const query = `SELECT id, name, event_start, event_end, completed FROM ${table} WHERE id = $1`;
    const values = [id];
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
