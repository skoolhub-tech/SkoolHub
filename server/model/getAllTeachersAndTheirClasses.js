const createClient = require('../database/db');

module.exports = async () => {
  const client = createClient();
  try {
    const query = 'SELECT t.name AS teacher_name, t.email AS teacher_email, c.name AS class_name FROM teachers t JOIN classes c ON t.id = c.teacher_id;';
    await client.connect();
    const { rows } = await client.query(query);
    const teachersMap = new Map();
    rows.forEach((row) => {
      const { teacher_name, teacher_email, class_name } = row;
      if (teachersMap.has(teacher_email)) {
        const teacher = teachersMap.get(teacher_email);
        teacher.class.push(class_name);
      } else {
        teachersMap.set(teacher_email, {
          email: teacher_email,
          name: teacher_name,
          class: [class_name]
        });
      }
    });
    const teachersArray = Array.from(teachersMap.values());
    return teachersArray;
  } catch (err) {
    console.error(`Error getting Teachers and their classes: ${err}`);
    throw err;
  } finally {
    await client.end();
  }
};
