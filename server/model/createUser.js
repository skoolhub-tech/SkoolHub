const createClient = require('../database/db');

module.exports = async (userData) => {
  const { name, email, role } = userData;
  const client = createClient();

  try {
    const query = `INSERT INTO ${getTableName(role)} (name, email, role_id)
                   VALUES ($1, $2, $3)
                   RETURNING *`;
    const values = [name, email, role];

    await client.connect();
    const { rows } = await client.query(query, values);
    return rows[0];
  } catch (err) {
    console.error('CREATE USER ERROR: ', err);
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
