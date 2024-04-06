/* eslint-disable no-console */
const createClient = require('./db');

const adminData = [
  { name: 'John Smith', email: 'jsmith@gmail.com' },
  { name: 'Jane Johnson', email: 'jane.johnson@skool.edu' },
];

const teachersData = [
  { name: 'John Doe', email: 'john.doe@aol.com' },
  { name: 'Jane Doe', email: 'jane.doe@hotmail.com' },
];

const studentsData = [
  { name: 'John Smith', email: 'john.smith@gmail.com' },
  { name: 'Jane Johnson', email: 'jane.johnson@gmail.com' },
  { name: 'Michael Brown', email: 'michael.brown@gmail.com' },
  { name: 'Emily Davis', email: 'emily.davis@gmail.com' },
  { name: 'William Miller', email: 'william.miller@gmail.com' },
  { name: 'Olivia Wilson', email: 'olivia.wilson@gmail.com' },
  { name: 'James Taylor', email: 'james.taylor@gmail.com' },
  { name: 'Sophia Anderson', email: 'sophia.anderson@gmail.com' },
  { name: 'Benjamin Thomas', email: 'benjamin.thomas@gmail.com' },
  { name: 'Isabella Martinez', email: 'isabella.martinez@gmail.com' },
  { name: 'Daniel Jackson', email: 'daniel.jackson@gmail.com' },
  { name: 'Mia White', email: 'mia.white@gmail.com' },
  { name: 'Joseph Harris', email: 'joseph.harris@gmail.com' },
  { name: 'Charlotte Clark', email: 'charlotte.clark@gmail.com' },
  { name: 'David Lewis', email: 'david.lewis@gmail.com' },
  { name: 'Abigail Young', email: 'abigail.young@gmail.com' },
  { name: 'Andrew Hall', email: 'andrew.hall@gmail.com' },
  { name: 'Elizabeth Allen', email: 'elizabeth.allen@gmail.com' },
  { name: 'Joshua King', email: 'joshua.king@gmail.com' },
  { name: 'Ella Wright', email: 'ella.wright@gmail.com' },
  { name: 'Christopher Green', email: 'christopher.green@gmail.com' },
  { name: 'Sofia Baker', email: 'sofia.baker@gmail.com' },
  { name: 'Andrew Hill', email: 'andrew.hill@gmail.com' },
  { name: 'Ava Phillips', email: 'ava.phillips@gmail.com' },
  { name: 'Matthew Turner', email: 'matthew.turner@gmail.com' },
  { name: 'Grace Carter', email: 'grace.carter@gmail.com' },
  { name: 'Ryan Ward', email: 'ryan.ward@gmail.com' },
  { name: 'Chloe Foster', email: 'chloe.foster@gmail.com' },
  { name: 'Samuel Morgan', email: 'samuel.morgan@gmail.com' },
  { name: 'Natalie Howard', email: 'natalie.howard@gmail.com' },
];

const classesData = [
  { name: 'Math', teacher_id: 1 },
  { name: 'Science', teacher_id: 2 },
  { name: 'History', teacher_id: 1 },
  { name: 'English', teacher_id: 2 },
];

const assignmentData = [
  { name: 'Math Assignment 1', class_id: 1, due_date: '2024-04-15' },
  { name: 'Science Assignment 1', class_id: 2, due_date: '2024-04-15' },
  { name: 'History Assignment 1', class_id: 3, due_date: '2024-04-15' },
  { name: 'English Assignment 1', class_id: 4, due_date: '2024-04-15' },
];

const teacherAssignmentData = [
  { teacher_id: 1, assignment_id: 1 },
  { teacher_id: 2, assignment_id: 2 },
  { teacher_id: 1, assignment_id: 3 },
  { teacher_id: 2, assignment_id: 4 },
];

const classesStudentsData = [
  { class_id: 1, student_id: 1 },
  { class_id: 2, student_id: 2 },
  { class_id: 3, student_id: 3 },
  { class_id: 4, student_id: 4 },
  { class_id: 1, student_id: 5 },
  { class_id: 2, student_id: 6 },
  { class_id: 3, student_id: 7 },
  { class_id: 4, student_id: 8 },
  { class_id: 1, student_id: 9 },
  { class_id: 2, student_id: 10 },
  { class_id: 3, student_id: 11 },
  { class_id: 4, student_id: 12 },
  { class_id: 1, student_id: 13 },
  { class_id: 2, student_id: 14 },
  { class_id: 3, student_id: 15 },
  { class_id: 4, student_id: 16 },
  { class_id: 1, student_id: 17 },
  { class_id: 2, student_id: 18 },
  { class_id: 3, student_id: 19 },
  { class_id: 4, student_id: 20 },
  { class_id: 1, student_id: 21 },
  { class_id: 2, student_id: 22 },
  { class_id: 3, student_id: 23 },
  { class_id: 4, student_id: 24 },
  { class_id: 1, student_id: 25 },
  { class_id: 2, student_id: 26 },
  { class_id: 3, student_id: 27 },
  { class_id: 4, student_id: 28 },
  { class_id: 1, student_id: 29 },
  { class_id: 2, student_id: 30 },
];

const studentsAssignmentsData = [
  {
    student_id: 1, assignment_id: 1, score: 90, total_points: 100, grade: 'A', completed: true,
  },
  {
    student_id: 2, assignment_id: 2, score: 80, total_points: 100, grade: 'B', completed: true,
  },
  {
    student_id: 3, assignment_id: 3, score: 70, total_points: 100, grade: 'C', completed: true,
  },
  {
    student_id: 4, assignment_id: 4, score: 0, total_points: 100, grade: 'F', completed: false,
  },
  {
    student_id: 5, assignment_id: 1, score: 90, total_points: 100, grade: 'A', completed: true,
  },
  {
    student_id: 6, assignment_id: 2, score: 80, total_points: 100, grade: 'B', completed: true,
  },
  {
    student_id: 7, assignment_id: 3, score: 100, total_points: 100, grade: 'A', completed: true,
  },
  {
    student_id: 8, assignment_id: 4, score: 87, total_points: 100, grade: 'B', completed: true,
  },
  {
    student_id: 9, assignment_id: 1, score: 70, total_points: 100, grade: 'C', completed: true,
  },
  {
    student_id: 10, assignment_id: 2, score: 80, total_points: 100, grade: 'B', completed: true,
  },
  {
    student_id: 11, assignment_id: 3, score: 65, total_points: 100, grade: 'D', completed: true,
  },
  {
    student_id: 12, assignment_id: 4, score: 47, total_points: 100, grade: 'F', completed: true,
  },
  {
    student_id: 13, assignment_id: 1, score: 85, total_points: 100, grade: 'B', completed: true,
  },
  {
    student_id: 14, assignment_id: 2, score: 86, total_points: 100, grade: 'B', completed: true,
  },
  {
    student_id: 15, assignment_id: 3, score: 0, total_points: 100, grade: 'F', completed: false,
  },
  {
    student_id: 16, assignment_id: 4, score: 87, total_points: 100, grade: 'B', completed: true,
  },
  {
    student_id: 17, assignment_id: 1, score: 91, total_points: 100, grade: 'A', completed: true,
  },
  {
    student_id: 18, assignment_id: 2, score: 82, total_points: 100, grade: 'B', completed: true,
  },
  {
    student_id: 19, assignment_id: 3, score: 76, total_points: 100, grade: 'C', completed: true,
  },
  {
    student_id: 20, assignment_id: 4, score: 0, total_points: 100, grade: 'F', completed: false,
  },
  {
    student_id: 21, assignment_id: 1, score: 97, total_points: 100, grade: 'A', completed: true,
  },
  {
    student_id: 22, assignment_id: 2, score: 84, total_points: 100, grade: 'B', completed: true,
  },
  {
    student_id: 23, assignment_id: 3, score: 0, total_points: 100, grade: 'F', completed: false,
  },
  {
    student_id: 24, assignment_id: 4, score: 84, total_points: 100, grade: 'B', completed: true,
  },
  {
    student_id: 25, assignment_id: 1, score: 90, total_points: 100, grade: 'A', completed: true,
  },
  {
    student_id: 26, assignment_id: 2, score: 80, total_points: 100, grade: 'B', completed: true,
  },
  {
    student_id: 27, assignment_id: 3, score: 70, total_points: 100, grade: 'C', completed: true,
  },
  {
    student_id: 28, assignment_id: 4, score: 0, total_points: 100, grade: 'F', completed: false,
  },
  {
    student_id: 29, assignment_id: 1, score: 90, total_points: 100, grade: 'A', completed: true,
  },
  {
    student_id: 30, assignment_id: 2, score: 80, total_points: 100, grade: 'B', completed: true,
  },
];

const teacherCalendarData = [
  {
    name: 'Math Test', teacher_id: 1, event_start: '2024-04-15T10:00:00.000Z', event_end: '2024-04-15T12:00:00.000Z', completed: true,
  },
  {
    name: 'History Quiz', teacher_id: 1, event_start: '2024-04-15T13:00:00.000Z', event_end: '2024-04-15T14:00:00.000Z', completed: false,
  },
  {
    name: 'Science Test', teacher_id: 2, event_start: '2024-04-15T09:00:00.000Z', event_end: '2024-04-15T11:00:00.000Z', completed: true,
  },
  {
    name: 'English Quiz', teacher_id: 2, event_start: '2024-04-15T13:00:00.000Z', event_end: '2024-04-15T14:00:00.000Z', completed: false,
  },
];

const studentCalendarData = [
  {
    name: 'Study for Math Test', student_id: 1, event_start: '2024-04-14T10:00:00.000Z', event_end: '2024-04-14T12:00:00.000Z', completed: false,
  },
  {
    name: 'Study for Science Test', student_id: 2, event_start: '2024-04-14T10:00:00.000Z', event_end: '2024-04-14T12:00:00.000Z', completed: false,
  },
  {
    name: 'Study for History Quiz', student_id: 3, event_start: '2024-04-14T11:00:00.000Z', event_end: '2024-04-14T12:00:00.000Z', completed: true,
  },
  {
    name: 'Study for English Quiz', student_id: 4, event_start: '2024-04-14T13:00:00.000Z', event_end: '2024-04-14T14:00:00.000Z', completed: true,
  },
];

const credentialsData = [
  { email: 'jsmith@gmail.com', password: 'vasetime', role_id: 1 },
  { email: 'jane.johnson@skool.edu', password: 'testingblue', role_id: 1 },
  { email: 'john.doe@aol.com', password: 'passworda;lkdfja', role_id: 2 },
  { email: 'jane.doe@hotmail.com', password: 'password123', role_id: 2 },
  { email: 'john.smith@gmail.com', password: 'password', role_id: 3 },
  { email: 'jane.johnson@gmail.com', password: 'test', role_id: 3 },
  { email: 'michael.brown@gmail.com', password: 'dog', role_id: 3 },
  { email: 'emily.davis@gmail.com', password: 'ohno', role_id: 3 },
  { email: 'william.miller@gmail.com', password: 'safe', role_id: 3 },
  { email: 'olivia.wilson@gmail.com', password: 'apples', role_id: 3 },
  { email: 'james.taylor@gmail.com', password: 'carrots', role_id: 3 },
  { email: 'sophia.anderson@gmail.com', password: 'cake', role_id: 3 },
  { email: 'benjamin.thomas@gmail.com', password: 'shoes', role_id: 3 },
  { email: 'isabella.martinez@gmail.com', password: 'bird', role_id: 3 },
  { email: 'daniel.jackson@gmail.com', password: 'car', role_id: 3 },
  { email: 'mia.white@gmail.com', password: 'pw123', role_id: 3 },
  { email: 'joseph.harris@gmail.com', password: 'bkapei93291kda;c', role_id: 3 },
  { email: 'charlotte.clark@gmail.com', password: 'corn', role_id: 3 },
  { email: 'david.lewis@gmail.com', password: 'sebastian', role_id: 3 },
  { email: 'abigail.young@gmail.com', password: 'byebye', role_id: 3 },
  { email: 'andrew.hall@gmail.com', password: 'animals', role_id: 3 },
  { email: 'elizabeth.allen@gmail.com', password: 'partytime', role_id: 3 },
  { email: 'joshua.king@gmail.com', password: 'ilikebrownies', role_id: 3 },
  { email: 'ella.wright@gmail.com', password: 'cauliflowercake', role_id: 3 },
  { email: 'christopher.green@gmail.com', password: 'ridinghigh', role_id: 3 },
  { email: 'sofia.baker@gmail.com', password: 'plannedflight', role_id: 3 },
  { email: 'andrew.hill@gmail.com', password: 'southwest', role_id: 3 },
  { email: 'ava.phillips@gmail.com', password: 'towels', role_id: 3 },
  { email: 'matthew.turner@gmail.com', password: 'connection', role_id: 3 },
  { email: 'grace.carter@gmail.com', password: 'githubrules', role_id: 3 },
  { email: 'ryan.ward@gmail.com', password: 'godzilla', role_id: 3 },
  { email: 'chloe.foster@gmail.com', password: 'mothra', role_id: 3 },
  { email: 'samuel.morgan@gmail.com', password: 'rodan', role_id: 3 },
  { email: 'natalie.howard@gmail.com', password: 'ghidorah', role_id: 3 },
];

async function seed() {
  const client = createClient();
  try {
    await client.connect();
    await client.query(`
      INSERT INTO roles (role) VALUES ('admin');
      INSERT INTO roles (role) VALUES ('teacher');
      INSERT INTO roles (role) VALUES ('student');
    `);

    adminData.forEach(async (admin) => {
      await client.query(`
        INSERT INTO admin (name, email, role_id) VALUES ('${admin.name}', '${admin.email}', 1);
      `);
    });

    teachersData.forEach(async (teacher) => {
      await client.query(`
        INSERT INTO teachers (name, email, role_id) VALUES ('${teacher.name}', '${teacher.email}', 2);
      `);
    });

    studentsData.forEach(async (student) => {
      await client.query(`
        INSERT INTO students (name, email, role_id) VALUES ('${student.name}', '${student.email}', 3);
      `);
    });

    classesData.forEach(async (classData) => {
      await client.query(`
        INSERT INTO classes (name, teacher_id) VALUES ('${classData.name}', ${classData.teacher_id});
      `);
    });

    assignmentData.forEach(async (assignment) => {
      await client.query(`
        INSERT INTO assignments (name, class_id, due_date) VALUES ('${assignment.name}', ${assignment.class_id}, '${assignment.due_date}');
      `);
    });

    teacherAssignmentData.forEach(async (teacherAssignment) => {
      await client.query(`
        INSERT INTO teachers_assignments (teacher_id, assignment_id) VALUES (${teacherAssignment.teacher_id}, ${teacherAssignment.assignment_id});
      `);
    });

    classesStudentsData.forEach(async (classStudent) => {
      await client.query(`
        INSERT INTO classes_students (class_id, student_id) VALUES (${classStudent.class_id}, ${classStudent.student_id});
      `);
    });

    studentsAssignmentsData.forEach(async (studentAssignment) => {
      await client.query(`
        INSERT INTO students_assignments (student_id, assignment_id, score, total_points, grade, completed) VALUES (${studentAssignment.student_id}, ${studentAssignment.assignment_id}, ${studentAssignment.score}, ${studentAssignment.total_points}, '${studentAssignment.grade}', ${studentAssignment.completed});
      `);
    });

    teacherCalendarData.forEach(async (teacherEvent) => {
      await client.query(`
        INSERT INTO teachers_calendar (name, teacher_id, event_start, event_end, completed) VALUES ('${teacherEvent.name}', ${teacherEvent.teacher_id}, '${teacherEvent.event_start}', '${teacherEvent.event_end}', ${teacherEvent.completed});
      `);
    });

    studentCalendarData.forEach(async (studentEvent) => {
      await client.query(`
        INSERT INTO students_calendar (name, student_id, event_start, event_end, completed) VALUES ('${studentEvent.name}', ${studentEvent.student_id}, '${studentEvent.event_start}', '${studentEvent.event_end}', ${studentEvent.completed});
      `);
    });

    credentialsData.forEach(async (credential) => {
      await client.query(`
        INSERT INTO credentials (email, password, role_id) VALUES ('${credential.email}', '${credential.password}', ${credential.role_id});
      `);
    });
  } catch (error) {
    console.error(error);
  }

  console.log('Seeded database successfully!');
}

seed();
