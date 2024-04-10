/* eslint-disable no-console */
const createClient = require('./db');

const client = createClient();

const createTableQuery = `
  CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR(255) NOT NULL
  );

  CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
  );

  CREATE TABLE admin_calendar (
    id SERIAL PRIMARY KEY,
    admin_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    event_start TIMESTAMP NOT NULL,
    event_end TIMESTAMP NOT NULL,
    completed BOOLEAN NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES admin(id)
  );

  CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
  );

  CREATE TABLE teachers_calendar (
    id SERIAL PRIMARY KEY,
    teacher_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    event_start TIMESTAMP NOT NULL,
    event_end TIMESTAMP NOT NULL,
    completed BOOLEAN NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
  );

  CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    teacher_id INT NOT NULL,
    threshold INT,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
  );

  CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    class_id INT NOT NULL,
    name VARCHAR(255) UNIQUE NOT NULL,
    due_date TIMESTAMP NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes(id)
  );

  CREATE TABLE teachers_assignments (
    id SERIAL PRIMARY KEY,
    teacher_id INT NOT NULL,
    assignment_id INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
    FOREIGN KEY (assignment_id) REFERENCES assignments(id)
  );

  CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
  );

  CREATE TABLE students_calendar (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    event_start TIMESTAMP NOT NULL,
    event_end TIMESTAMP NOT NULL,
    completed BOOLEAN NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id)
  );

  CREATE TABLE students_assignments (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    assignment_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    submitted_on TIMESTAMP NOT NULL,
    score INT,
    total_points INT,
    grade VARCHAR(255),
    completed BOOLEAN NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (assignment_id) REFERENCES assignments(id),
    UNIQUE (student_id, assignment_id)
  );

  CREATE TABLE classes_students (
    id SERIAL PRIMARY KEY,
    class_id INT NOT NULL,
    student_id INT NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (student_id) REFERENCES students(id)
  );

  CREATE TABLE credentials (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
  );

  CREATE INDEX idx_student_id ON students(id);
  CREATE INDEX idx_teachers_id ON teachers(id);
  CREATE INDEX idx_classes_id ON classes(id);
`;

client.connect()
  .then(() => {
    client.query('DROP TABLE IF EXISTS roles, admin, admin_calendar, teachers, teachers_emails, teachers_calendar, classes, assignments, teachers_assignments, students, students_emails, students_calendar, students_assignments, classes_students, credentials, admin_credentials, teachers_credentials, students_credentials CASCADE;');
  })
  .then(() => {
    console.log('Connected to Postgres database');
    return client.query(createTableQuery);
  })
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch((err) => {
    console.error('Error creating table: ', err);
  })
  .finally(() => {
    client.end();
  });
