const createAssignment = require('./createAssignment');
const createClass = require('./createClass');
const createClassStudent = require('./createClassStudent');
const createUser = require('./createUser');
const deleteCalendar = require('./deleteCalendar');
const deleteClass = require('./deleteClass');
const deleteClassStudent = require('./deleteClassStudent');
const deleteUser = require('./deleteUser');
const getAllTeachersAndTheirClasses = require('./getAllTeachersAndTheirClasses');
const getClassStudents = require('./getClassStudents');
const getClassThreshold = require('./getClassThreshold');
const getAdmin = require('./getAdmin');
const getCalendar = require('./getCalendar');
const getClasses = require('./getClasses');
const getClassesAndAssignmentsForStudent = require('./getClassesAndAssignmentsForStudent');
const getClassesAndAssignmentsForTeacher = require('./getClassesAndAssignmentsForTeacher');
const getCurrentAssignments = require('./getCurrentAssignments');
const getRoleAtLogin = require('./getRoleAtLogin');
const getRoles = require('./getRoles');
const getStudentClassGrades = require('./getStudentClassGrades');
const getStudents = require('./getStudents');
const getSubmittedAssignment = require('./getSubmittedAssignment');
const getSubmittedAssignmentsForTeacher = require('./getSubmittedAssignmentsForTeacher');
const getTeacherClasses = require('./getTeacherClasses');
const getTeachers = require('./getTeachers');
const getTeachersAndClassesForStudent = require('./getTeachersAndClassesForStudent');
const getUserClasses = require('./getUserClasses');
const gradeAssignment = require('./gradeAssignment');
const login = require('./login');
const sendAutoEmail = require('./sendAutoEmail');
const sendPeerEmail = require('./sendPeerEmail');
const submitAssignment = require('./submitAssignment');
const submitCalendarTask = require('./submitCalendarTask');
const updateAssignment = require('./updateAssignment');
const updateCalendar = require('./updateCalendar');
const updateThreshold = require('./updateThreshold');

module.exports = {
  createAssignment,
  createClass,
  createClassStudent,
  createUser,
  deleteCalendar,
  deleteClass,
  deleteClassStudent,
  deleteUser,
  getAllTeachersAndTheirClasses,
  getClassStudents,
  getClassThreshold,
  getAdmin,
  getCalendar,
  getClasses,
  getClassesAndAssignmentsForStudent,
  getClassesAndAssignmentsForTeacher,
  getCurrentAssignments,
  getRoleAtLogin,
  getRoles,
  getStudentClassGrades,
  getStudents,
  getSubmittedAssignment,
  getSubmittedAssignmentsForTeacher,
  getTeacherClasses,
  getTeachers,
  getTeachersAndClassesForStudent,
  getUserClasses,
  gradeAssignment,
  login,
  sendAutoEmail,
  sendPeerEmail,
  submitAssignment,
  submitCalendarTask,
  updateAssignment,
  updateCalendar,
  updateThreshold,
};
