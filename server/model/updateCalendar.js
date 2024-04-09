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
    const query = `UPDATE ${table} SET name = $2, event_start = $3, event_end = $4, completed = $5 WHERE id = $1`;
    const values = [data.id, data.title, data.start, data.end, data.completed];
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
