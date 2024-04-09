const createClient = require('../database/db');

module.exports = async (userId, role) => {
  const client = createClient();

  try {
    const query = `DELETE FROM ${getTableName(role)}
                   WHERE id = $1`;
    const values = [userId];

    await client.connect();
    const result = await client.query(query, values);
    return 'User deleted successfully';
  } catch (err) {
    console.error('DELETE USER ERROR: ', err);
    throw err;
  } finally {
    await client.end();
  }
};

const roleToTable = {
  1: 'admin',
  2: 'teachers',
  3: 'students',
};

function getTableName(role) {
  const tableName = roleToTable[role];
  return tableName;
}
