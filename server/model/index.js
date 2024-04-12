const createAssignment = require('./createAssignment');
const createClass = require('./createClass');
const createClassStudent = require('./createClassStudent');
const createUser = require('./createUser');
const deleteCalendar = require('./deleteCalendar');
const deleteClass = require('./deleteClass');
const deleteClassStudent = require('./deleteClassStudent');
const deleteUser = require('./deleteUser');
const getAllTeachersAndTheirClasses = require('./getAllTeachersAndTheirClasses');
const getAdmin = require('./getAdmin');
const getAssignmentDueDate = require('./getAssignmentDueDate');
const getAssignmentsForClass = require('./getAssignmentsForClass');
const getCalendar = require('./getCalendar');
const getClassIdFromAssignmentId = require('./getClassIdFromAssignmentId');
const getClassStudents = require('./getClassStudents');
const getClassThreshold = require('./getClassThreshold');
const getClasses = require('./getClasses');
const getClassesFromStudentEmail = require('./getClassesFromStudentEmail');
const getClassesFromTeacherEmail = require('./getClassesFromTeacherEmail');
const getCurrentAssignments = require('./getCurrentAssignments');
const getRoleAtLogin = require('./getRoleAtLogin');
const getRoles = require('./getRoles');
const getStudentClassGrades = require('./getStudentClassGrades');
const getStudentIdFromEmail = require('./getStudentIdFromEmail');
const getStudents = require('./getStudents');
const getSubmissionsForAssignment = require('./getSubmissionsForAssignment');
const getSubmittedAssignmentInfo = require('./getSubmittedAssignmentInfo');
const getTeacherClasses = require('./getTeacherClasses');
const getTeachers = require('./getTeachers');
const getTeachersAndClasses = require('./getTeachersAndClasses');
const getUserClasses = require('./getUserClasses');
const insertCalendar = require('./insertCalendar');
const insertUpdateSubmittedAssignment = require('./insertUpdateSubmittedAssignment');
const login = require('./login');
const updateAssignment = require('./updateAssignment');
const updateCalendar = require('./updateCalendar');
const updateSubmissionGrade = require('./updateSubmissionGrade');
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
  getAdmin,
  getAssignmentDueDate,
  getAssignmentsForClass,
  getCalendar,
  getClassIdFromAssignmentId,
  getClassStudents,
  getClassThreshold,
  getClasses,
  getClassesFromStudentEmail,
  getClassesFromTeacherEmail,
  getCurrentAssignments,
  getRoleAtLogin,
  getRoles,
  getStudentClassGrades,
  getStudentIdFromEmail,
  getStudents,
  getSubmissionsForAssignment,
  getSubmittedAssignmentInfo,
  getTeacherClasses,
  getTeachers,
  getTeachersAndClasses,
  getUserClasses,
  insertCalendar,
  insertUpdateSubmittedAssignment,
  login,
  updateAssignment,
  updateCalendar,
  updateSubmissionGrade,
  updateThreshold,
};
