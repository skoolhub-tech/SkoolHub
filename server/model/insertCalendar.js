const createClient = require('../database/db');

module.exports = async (role, data) => {
  let table;
  let roleId;
  if (role === 3) {
    table = 'students_calendar';
    roleId = 'student_id';
  } else if (role === '2') {
    table = 'teachers_calendar';
    roleId = 'teacher_id';
  } else if (role === '1') {
    table = 'admin_calendar';
    roleId = 'admin_id';
  }
  const client = createClient();
  try {
    const query = `INSERT INTO ${table} (${roleId}, name, event_start, event_end, completed) VALUES ($1, $2, $3, $4, $5)`;
    const values = [data.id, data.title, data.start, data.end, false];
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
