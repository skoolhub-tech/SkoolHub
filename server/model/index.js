const getClasses = require('./getClasses');
const getTeachers = require('./getTeachers');
const getStudents = require('./getStudents');
const getAdmin = require('./getAdmin');
const getRoleAtLogin = require('./getRoleAtLogin');
const getClassStudents = require('./getClassStudents');
const getStudentIdFromEmail = require('./getStudentIdFromEmail');
const getClassIdFromAssignmentId = require('./getClassIdFromAssignmentId');

module.exports = {
  getClasses,
  getTeachers,
  getStudents,
  getAdmin,
  getRoleAtLogin,
  getClassStudents,
  getStudentIdFromEmail,
  getClassIdFromAssignmentId,
};
