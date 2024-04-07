const getAdmin = require('./getAdmin');
const getClassStudents = require('./getClassStudents');
const getClasses = require('./getClasses');
const getClassesAndAssignmentsForStudent = require('./getClassesAndAssignmentsForStudent');
const getRoleAtLogin = require('./getRoleAtLogin');
const getStudents = require('./getStudents');
const getTeacherClasses = require('./getTeacherClasses');
const getTeachers = require('./getTeachers');
const login = require('./login');
const sendAutoEmail = require('./sendAutoEmail');
const sendPeerEmail = require('./sendPeerEmail');
const submitAssignment = require('./submitAssignment');

module.exports = {
  getAdmin,
  getClassStudents,
  getClasses,
  getClassesAndAssignmentsForStudent,
  getRoleAtLogin,
  getStudents,
  getTeacherClasses,
  getTeachers,
  login,
  sendAutoEmail,
  sendPeerEmail,
  submitAssignment,
};
