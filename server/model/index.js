const getClasses = require('./getClasses');
const getTeachers = require('./getTeachers');
const getStudents = require('./getStudents');
const getAdmin = require('./getAdmin');
const getStudentIdFromEmail = require('./getStudentIdFromEmail');
const getClassIdFromAssignmentId = require('./getClassIdFromAssignmentId');

module.exports = {
  getClasses,
  getTeachers,
  getStudents,
  getAdmin,
  getStudentIdFromEmail,
  getClassIdFromAssignmentId,
};
