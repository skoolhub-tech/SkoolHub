const getClasses = require('./getClasses');
const getTeachers = require('./getTeachers');
const getStudents = require('./getStudents');
const getAdmin = require('./getAdmin');
const getRoleAtLogin = require('./getRoleAtLogin');
const getClassStudents = require('./getClassStudents');
<<<<<<< HEAD
const getStudentIdFromEmail = require('./getStudentIdFromEmail');
const getClassIdFromAssignmentId = require('./getClassIdFromAssignmentId');
const getAssignmentDueDate = require('./getAssignmentDueDate');
const insertUpdateSubmittedAssignment = require('./insertUpdateSubmittedAssignment');
const getTeacherClasses = require('./getTeacherClasses');
=======
const login = require('./login');
>>>>>>> 2c59244226e1534b701d65b244f2161ba7403e66

module.exports = {
  getClasses,
  getTeachers,
  getStudents,
  getAdmin,
  getRoleAtLogin,
  getClassStudents,
<<<<<<< HEAD
  getStudentIdFromEmail,
  getClassIdFromAssignmentId,
  getAssignmentDueDate,
  insertUpdateSubmittedAssignment,
  getTeacherClasses,
=======
  login,
>>>>>>> 2c59244226e1534b701d65b244f2161ba7403e66
};
