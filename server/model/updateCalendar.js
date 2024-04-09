const createClient = require('../database/db');

module.exports = async (role, data) => {
  let table;
  let roleId;
  if (role === 3) {
    table = 'students_calendar';
    roleId = 'student_id';
  } else if (role === 2) {
    table = 'teachers_calendar';
    roleId = 'teacher_id';
  } else if (role === 1) {
    table = 'admin_calendar';
    roleId = 'admin_id';
  }
  const client = createClient();
  try {
    const query = `UPDATE ${table} SET name = $2, event_start = $3, event_end = $4, completed = $5 WHERE ${roleId} = $1 AND id = $6`;
    const values = [data.id2, data.title, data.start, data.end, data.completed, data.id];
    console.log('values:', values);
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
