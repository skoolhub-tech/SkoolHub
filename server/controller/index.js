const getAdmin = require('./getAdmin');
const getClassStudents = require('./getClassStudents');
const getClasses = require('./getClasses');
const getClassesAndAssignmentsForStudent = require('./getClassesAndAssignmentsForStudent');
const getRoleAtLogin = require('./getRoleAtLogin');
const getStudents = require('./getStudents');
const getTeacherClasses = require('./getTeacherClasses');
const getTeachers = require('./getTeachers');
const login = require('./login');
<<<<<<< HEAD
const getStudentClassGrades = require('./getStudentClassGrades');
=======
const sendAutoEmail = require('./sendAutoEmail');
const sendPeerEmail = require('./sendPeerEmail');
const submitAssignment = require('./submitAssignment');
>>>>>>> bc47ca05ee704eaf4a4907785808488c247088a5

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
<<<<<<< HEAD
  getStudentClassGrades,
=======
  sendAutoEmail,
  sendPeerEmail,
  submitAssignment,
>>>>>>> bc47ca05ee704eaf4a4907785808488c247088a5
};
