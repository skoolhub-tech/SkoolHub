const getClasses = require('./getClasses');
const sendPeerEmail = require('./sendPeerEmail');
const sendAutoEmail = require('./sendAutoEmail');
const getAdmin = require('./getAdmin');
const getTeachers = require('./getTeachers');
const getStudents = require('./getStudents');
const getRoleAtLogin = require('./getRoleAtLogin');
const getClassStudents = require('./getClassStudents');
const login = require('./login');

module.exports = {
  getClasses,
  sendPeerEmail,
  sendAutoEmail,
  getAdmin,
  getTeachers,
  getStudents,
  getRoleAtLogin,
  getClassStudents,
  login,
};
