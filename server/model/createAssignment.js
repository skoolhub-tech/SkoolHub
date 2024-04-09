const createClient = require('../database/db');

module.exports = async (assignment) => {
  const client = createClient();
  try {
    const {
      classId, className, dueDate, instructions, teacherId,
    } = assignment;
    await client.connect();
    await client.query('BEGIN');
    await client.query(`INSERT INTO assignments (class_id, name, due_date, instructions)
      VALUES ($1, $2, $3, $4)`, [classId, className, dueDate, instructions]);
    await client.query(`INSERT INTO teachers_assignments (teacher_id, assignment_id)
      VALUES ($1, $2)`, [teacherId, assignmentId]);
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating class: ', err);
    throw err;
  } finally {
    await client.end();
  }
};
