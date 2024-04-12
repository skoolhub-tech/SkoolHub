/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const createClient = require('./db');
const fs = require('fs').promises;
const path = require('path');

async function fetchData() {
  const client = createClient();
  try {
    const query = `SELECT
        assignments.class_id AS c_id,
        students_assignments.assignment_id AS a_id,
        students_assignments.student_id AS s_id
      FROM students_assignments
      JOIN assignments ON assignments.id = students_assignments.assignment_id`;
    await client.connect();
    const { rows } = await client.query(query);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
  }
}

async function seedDocuments() {
  const data = await fetchData();
  const documents = data.map((row) => {
    const { c_id, a_id, s_id } = row;
    return {
      class_id: c_id,
      assignment_id: a_id,
      student_id: s_id,
    };
  });
  return documents;
}

async function seedFiles() {
  const documents = await seedDocuments();
  const dir = path.join(__dirname, '..', 'seedPDFs');
  const files = await fs.readdir(dir);
  let i = 0;
  for (const document of documents) {
    const { class_id, assignment_id, student_id } = document;
    const file = files[i % files.length];
    const src = path.join(dir, file);
    const dest = path.join(__dirname, '..', 'documents', `${class_id}`, `${assignment_id}`, `${student_id}.pdf`);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
    i += 1;
  }
}

seedFiles()
  .then(() => console.log('Files seeded'))
  .catch(console.error);
