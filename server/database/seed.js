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
  { name: 'Math', teacher_id: 1, threshold: 100 },
  { name: 'Science', teacher_id: 2, threshold: 100 },
  { name: 'History', teacher_id: 1, threshold: 100 },
  { name: 'English', teacher_id: 2, threshold: 100 },
];

const assignmentData = [
  { name: 'Math Assignment 1', class_id: 1, due_date: '2024-04-07', teacher_id: 1 }, // id: 1
  { name: 'Science Assignment 1', class_id: 2, due_date: '2024-04-15', teacher_id: 2 }, // id: 2
  { name: 'History Assignment 1', class_id: 3, due_date: '2024-04-15', teacher_id: 1 }, // id: 3
  { name: 'English Assignment 1', class_id: 4, due_date: '2024-04-15', teacher_id: 2 }, // id: 4
  { name: 'Math Assignment 2', class_id: 1, due_date: '2024-04-22', teacher_id: 1 }, // id: 5
  { name: 'Science Assignment 2', class_id: 2, due_date: '2024-04-22', teacher_id: 2 }, // id: 6
  { name: 'History Assignment 2', class_id: 3, due_date: '2024-04-22', teacher_id: 1 }, // id: 7
  { name: 'English Assignment 2', class_id: 4, due_date: '2024-04-22', teacher_id: 2 }, // id: 8
  { name: 'Math Exam', class_id: 1, due_date: '2024-04-30', teacher_id: 1 }, // id: 9
  { name: 'Science Exam', class_id: 2, due_date: '2024-04-30', teacher_id: 2 }, // id: 10
  { name: 'History Exam', class_id: 3, due_date: '2024-04-30', teacher_id: 1 }, // id: 11
  { name: 'English Exam', class_id: 4, due_date: '2024-04-30', teacher_id: 2 }, // id: 12
  { name: 'Math Group Project', class_id: 1, due_date: '2024-05-11', teacher_id: 1 }, // id: 13
  { name: 'Science Lab Report', class_id: 2, due_date: '2024-05-17', teacher_id: 2 }, // id: 14
  { name: 'History Research Paper', class_id: 3, due_date: '2024-05-09', teacher_id: 1 }, // id: 15
  { name: 'English Essay', class_id: 4, due_date: '2024-05-10', teacher_id: 2 }, // id: 16
];

const classesStudentsData = [
  { class_id: 1, student_id: 1 },
  { class_id: 2, student_id: 1 },
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
    student_id: 1, assignment_id: 5, score: 83, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 1, assignment_id: 9, score: 92, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 2, assignment_id: 2, score: 80, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 2, assignment_id: 6, score: 75, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 2, assignment_id: 10, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 2, assignment_id: 14, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 3, assignment_id: 3, score: 70, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 3, assignment_id: 7, score: 87, total_points: 100, grade: 'B', completed: false, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 3, assignment_id: 11, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 3, assignment_id: 15, score: 80, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-05-09 00:00:00',
  },
  {
    student_id: 4, assignment_id: 4, score: 72, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 4, assignment_id: 8, score: 64, total_points: 100, grade: 'D', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 4, assignment_id: 12, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 4, assignment_id: 16, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-10 00:00:00',
  },
  {
    student_id: 5, assignment_id: 1, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-07 00:00:00',
  },
  {
    student_id: 5, assignment_id: 5, score: 83, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 5, assignment_id: 9, score: 91, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 5, assignment_id: 13, score: 89, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-05-11 00:00:00',
  },
  {
    student_id: 6, assignment_id: 2, score: 80, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 6, assignment_id: 6, score: 80, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 6, assignment_id: 10, score: 77, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 6, assignment_id: 14, score: 94, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 7, assignment_id: 3, score: 100, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 7, assignment_id: 7, score: 87, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 7, assignment_id: 11, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 7, assignment_id: 15, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 8, assignment_id: 4, score: 87, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 8, assignment_id: 8, score: 77, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 8, assignment_id: 12, score: 74, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 8, assignment_id: 16, score: 81, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 9, assignment_id: 1, score: 70, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-04-07 00:00:00',
  },
  {
    student_id: 9, assignment_id: 5, score: 80, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 9, assignment_id: 9, score: 81, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 9, assignment_id: 13, score: 73, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 10, assignment_id: 2, score: 80, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 10, assignment_id: 6, score: 75, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 10, assignment_id: 10, score: 86, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 10, assignment_id: 14, score: 93, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 11, assignment_id: 3, score: 65, total_points: 100, grade: 'D', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 11, assignment_id: 7, score: 87, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 11, assignment_id: 11, score: 81, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 11, assignment_id: 15, score: 75, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 12, assignment_id: 4, score: 47, total_points: 100, grade: 'F', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 12, assignment_id: 8, score: 78, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 12, assignment_id: 12, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 12, assignment_id: 16, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 13, assignment_id: 1, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-07 00:00:00',
  },
  {
    student_id: 13, assignment_id: 5, score: 80, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 13, assignment_id: 9, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 13, assignment_id: 13, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 14, assignment_id: 2, score: 86, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 14, assignment_id: 6, score: 94, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 14, assignment_id: 10, score: 81, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 14, assignment_id: 14, score: 97, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 15, assignment_id: 3, score: 98, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 15, assignment_id: 7, score: 87, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 15, assignment_id: 11, score: 91, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 15, assignment_id: 15, score: 99, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 16, assignment_id: 4, score: 87, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 16, assignment_id: 8, score: 77, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 16, assignment_id: 12, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 16, assignment_id: 16, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 17, assignment_id: 5, score: 86, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 17, assignment_id: 9, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 17, assignment_id: 13, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 18, assignment_id: 2, score: 82, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 18, assignment_id: 6, score: 95, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 18, assignment_id: 10, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 18, assignment_id: 14, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 19, assignment_id: 3, score: 76, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 19, assignment_id: 7, score: 87, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 19, assignment_id: 11, score: 67, total_points: 100, grade: 'D', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 19, assignment_id: 15, score: 72, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 20, assignment_id: 4, score: 67, total_points: 100, grade: 'D', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 20, assignment_id: 8, score: 77, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 20, assignment_id: 12, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 20, assignment_id: 16, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 21, assignment_id: 1, score: 97, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-07 00:00:00',
  },
  {
    student_id: 21, assignment_id: 5, score: 86, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 21, assignment_id: 9, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 21, assignment_id: 13, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 22, assignment_id: 2, score: 84, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 22, assignment_id: 6, score: 95, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 22, assignment_id: 10, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 22, assignment_id: 14, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 23, assignment_id: 3, score: 99, total_points: 100, grade: 'A', completed: false, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 23, assignment_id: 7, score: 87, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 23, assignment_id: 11, score: 80, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 23, assignment_id: 15, score: 97, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 24, assignment_id: 4, score: 84, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 24, assignment_id: 12, score: 73, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 24, assignment_id: 16, score: 78, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 25, assignment_id: 1, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-07 00:00:00',
  },
  {
    student_id: 25, assignment_id: 5, score: 89, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 25, assignment_id: 9, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 25, assignment_id: 13, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 26, assignment_id: 2, score: 80, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 26, assignment_id: 6, score: 93, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 26, assignment_id: 10, score: 82, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 26, assignment_id: 14, score: 96, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 27, assignment_id: 3, score: 70, total_points: 100, grade: 'C', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 27, assignment_id: 7, score: 81, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 27, assignment_id: 11, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 27, assignment_id: 15, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 28, assignment_id: 4, score: 81, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 28, assignment_id: 8, score: 92, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 28, assignment_id: 12, score: 87, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 29, assignment_id: 1, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-07 00:00:00',
  },
  {
    student_id: 29, assignment_id: 5, score: 100, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 29, assignment_id: 9, score: 96, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 29, assignment_id: 13, score: 89, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-05-17 00:00:00',
  },
  {
    student_id: 30, assignment_id: 2, score: 80, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 30, assignment_id: 6, score: 95, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-04-15 00:00:00',
  },
  {
    student_id: 30, assignment_id: 10, score: 85, total_points: 100, grade: 'B', completed: true, submitted_on: '2024-04-30 00:00:00',
  },
  {
    student_id: 30, assignment_id: 14, score: 90, total_points: 100, grade: 'A', completed: true, submitted_on: '2024-05-17 00:00:00',
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

const adminCalendarData = [
  {
    name: 'Write student assembly speech', admin_id: 1, event_start: '2024-04-14T10:00:00.000Z', event_end: '2024-04-14T12:00:00.000Z', completed: false,
  },
  {
    name: 'Transfer J. Smith to J. Doe Science class', admin_id: 2, event_start: '2024-04-14T10:00:00.000Z', event_end: '2024-04-14T12:00:00.000Z', completed: false,
  },
  {
    name: 'Add Quimsly Adams to teacher list', admin_id: 1, event_start: '2024-04-14T11:00:00.000Z', event_end: '2024-04-14T12:00:00.000Z', completed: true,
  },
  {
    name: 'Remove R. Veginald from student list', admin_id: 2, event_start: '2024-04-14T13:00:00.000Z', event_end: '2024-04-14T14:00:00.000Z', completed: true,
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

function createInstructions() {
  const verbs = ['Hug ', 'Pet ', 'Play with ', 'Walk ', 'Give treats to '];
  const subjects = [
    'a dog',
    'a puppy',
    'a few dogs',
    'a few puppies',
    'some dogs',
    'some puppies',
    'lots of dogs',
    'lots of puppies',
    'as many dogs as you can find',
    'as many puppies as you can find',
    'all the dogs',
    'all the puppies',
  ];
  const punctuations = ['. ', '! ', '!! ', '!!! '];
  return `${verbs[Math.floor(Math.random() * verbs.length)]} ${subjects[Math.floor(Math.random() * subjects.length)]}${punctuations[Math.floor(Math.random() * punctuations.length)]}`;
}

function createFeedback() {
  const feedback1 = [
    'WOW',
    'Great job',
    'Excellent work',
    'Fantastic',
    'Amazing',
    'Superb',
    'Impressive',
    'Bravo',
    'Well done',
    'Good job',
    'Keep it up',
    'You nailed it',
  ];
  const punctuations = ['. ', '! ', '!! ', '!!! '];
  const feedback2 = ['What a cute ',
    'What an adorable ',
    'What a sweet ',
    'What a lovely ',
    'What a precious ',
    'What a beautiful ',
  ];
  const animals = ['dog', 'puppy', 'pup', 'puppers', 'furry friend', 'pooch'];
  return `${feedback1[Math.floor(Math.random() * feedback1.length)]}${punctuations[Math.floor(Math.random() * punctuations.length)]}${feedback2[Math.floor(Math.random() * feedback2.length)]}${animals[Math.floor(Math.random() * animals.length)]}${punctuations[Math.floor(Math.random() * punctuations.length)]}`;
}

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
        INSERT INTO classes (name, teacher_id, threshold) VALUES ('${classData.name}', ${classData.teacher_id}, ${classData.threshold});
      `);
    });

    assignmentData.forEach(async (assignment) => {
      await client.query(`
        INSERT INTO assignments (name, class_id, due_date, teacher_id, instructions) VALUES ('${assignment.name}', ${assignment.class_id}, '${assignment.due_date}', ${assignment.teacher_id}, '${createInstructions()}');
    `);
    });

    classesStudentsData.forEach(async (classStudent) => {
      await client.query(`
        INSERT INTO classes_students (class_id, student_id) VALUES (${classStudent.class_id}, ${classStudent.student_id});
      `);
    });

    studentsAssignmentsData.forEach(async (studentAssignment) => {
      await client.query(`
      INSERT INTO students_assignments (student_id, assignment_id, file_path, submitted_on, score, total_points, grade, completed, feedback) VALUES (${studentAssignment.student_id}, ${studentAssignment.assignment_id}, 'placeholder', '${studentAssignment.submitted_on}', ${studentAssignment.score}, ${studentAssignment.total_points}, '${studentAssignment.grade}', ${studentAssignment.completed}, '${createFeedback()}');
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

    adminCalendarData.forEach(async (adminEvent) => {
      await client.query(`
        INSERT INTO admin_calendar (name, admin_id, event_start, event_end, completed) VALUES ('${adminEvent.name}', ${adminEvent.admin_id}, '${adminEvent.event_start}', '${adminEvent.event_end}', ${adminEvent.completed});
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
