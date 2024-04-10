const createAssignment = require('./createAssignment');
const getAdmin = require('./getAdmin');
const getAssignmentDueDate = require('./getAssignmentDueDate');
const getAssignmentsForClass = require('./getAssignmentsForClass');
const getClassIdFromAssignmentId = require('./getClassIdFromAssignmentId');
const getClassStudents = require('./getClassStudents');
const getClasses = require('./getClasses');
const getClassesFromStudentEmail = require('./getClassesFromStudentEmail');
const getClassesFromTeacherEmail = require('./getClassesFromTeacherEmail');
const getRoleAtLogin = require('./getRoleAtLogin');
const getStudentIdFromEmail = require('./getStudentIdFromEmail');
const getStudents = require('./getStudents');
const getSubmissionsForAssignment = require('./getSubmissionsForAssignment');
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
const createUser = require('./createUser');
const getRoles = require('./getRoles');
const deleteUser = require('./deleteUser');
const updateCalendar = require('./updateCalendar');
const createClass = require('./createClass');
const deleteClass = require('./deleteClass');
const deleteCalendar = require('./deleteCalendar');
const getCurrentAssignments = require('./getCurrentAssignments');
const getClassThreshold = require('./getClassThreshold');
const updateThreshold = require('./updateThreshold');

module.exports = {
  createAssignment,
  getAdmin,
  getAssignmentDueDate,
  getAssignmentsForClass,
  getClassIdFromAssignmentId,
  getClassStudents,
  getClasses,
  getClassesFromStudentEmail,
  getClassesFromTeacherEmail,
  getRoleAtLogin,
  getStudentIdFromEmail,
  getStudents,
  getSubmissionsForAssignment,
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
  createUser,
  getRoles,
  deleteUser,
  updateCalendar,
  createClass,
  deleteClass,
  deleteCalendar,
  getCurrentAssignments,
  getClassThreshold,
  updateThreshold,
};
