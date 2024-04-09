const getAdmin = require('./getAdmin');
const getAssignmentDueDate = require('./getAssignmentDueDate');
const getAssignmentsForClass = require('./getAssignmentsForClass');
const getClassIdFromAssignmentId = require('./getClassIdFromAssignmentId');
const getClassStudents = require('./getClassStudents');
const getClasses = require('./getClasses');
const getClassesFromEmail = require('./getClassesFromEmail');
const getRoleAtLogin = require('./getRoleAtLogin');
const getStudentIdFromEmail = require('./getStudentIdFromEmail');
const getStudents = require('./getStudents');
const getSubmittedOnDateForAssignment = require('./getSubmittedOnDateForAssignment');
const getTeacherClasses = require('./getTeacherClasses');
const getTeachers = require('./getTeachers');
const insertUpdateSubmittedAssignment = require('./insertUpdateSubmittedAssignment');
const login = require('./login');
const getStudentClassGrades = require('./getStudentClassGrades');
const getTeachersAndClasses = require('./getTeachersAndClasses');
const getCalendar = require('./getCalendar');
const insertCalendar = require('./insertCalendar');
const getAllTeachersAndTheirClasses = require('./getAllTeachersAndTheirClasses');
const createClassStudent = require('./createClassStudent');
const deleteClassStudent = require('./deleteClassStudent');

module.exports = {
  getAdmin,
  getAssignmentDueDate,
  getAssignmentsForClass,
  getClassIdFromAssignmentId,
  getClassStudents,
  getClasses,
  getClassesFromEmail,
  getRoleAtLogin,
  getStudentIdFromEmail,
  getStudents,
  getSubmittedOnDateForAssignment,
  getTeacherClasses,
  getTeachers,
  insertUpdateSubmittedAssignment,
  login,
  getStudentClassGrades,
  getTeachersAndClasses,
  getCalendar,
  insertCalendar,
  getAllTeachersAndTheirClasses,
  createClassStudent,
  deleteClassStudent,
};
