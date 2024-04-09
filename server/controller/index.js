const getAdmin = require('./getAdmin');
const getClassStudents = require('./getClassStudents');
const getClasses = require('./getClasses');
const getClassesAndAssignmentsForStudent = require('./getClassesAndAssignmentsForStudent');
const getRoleAtLogin = require('./getRoleAtLogin');
const getStudents = require('./getStudents');
const getTeacherClasses = require('./getTeacherClasses');
const getTeachers = require('./getTeachers');
const getSubmittedAssignment = require('./getSubmittedAssignment');
const login = require('./login');
const getStudentClassGrades = require('./getStudentClassGrades');
const sendAutoEmail = require('./sendAutoEmail');
const sendPeerEmail = require('./sendPeerEmail');
const submitAssignment = require('./submitAssignment');
const getTeachersAndClassesForStudent = require('./getTeachersAndClassesForStudent');
const getAllTeachersAndTheirClasses = require('./getAllTeachersAndTheirClasses');
const getCalendar = require('./getCalendar');
const submitCalendarTask = require('./submitCalendarTask');
const createClassStudent = require('./createClassStudent');
const deleteClassStudent = require('./deleteClassStudent');
const createUser = require('./createUser');

module.exports = {
  getAdmin,
  getClassStudents,
  getClasses,
  getClassesAndAssignmentsForStudent,
  getRoleAtLogin,
  getStudents,
  getTeacherClasses,
  getTeachers,
  getSubmittedAssignment,
  login,
  getStudentClassGrades,
  sendAutoEmail,
  sendPeerEmail,
  submitAssignment,
  getTeachersAndClassesForStudent,
  getAllTeachersAndTheirClasses,
  getCalendar,
  submitCalendarTask,
  createClassStudent,
  deleteClassStudent,
  createUser,
};
