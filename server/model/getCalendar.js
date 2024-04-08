const createClient = require('../database/db');

module.exports = async (email) => {
  const client = createClient();
  try {
    const query = `SELECT id, name, event_start, event_end, completed FROM students_calendar WHERE email = $1
    UNION
    SELECT id, name, role_id FROM teachers WHERE email = $1
    UNION
    SELECT id, name, role_id FROM admin WHERE email = $1;`;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
};
