const router = require('express').Router();
require('dotenv').config();
const multer = require('multer');
const controller = require('./controller');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * process.env.MAX_FILE_SIZE },
});

// GET requests
router.get('/admin', controller.getAdmin);
router.get('/assignment', controller.getSubmittedAssignment);
router.get('/assignments/submissions', controller.getSubmittedAssignmentsForTeacher);
router.get('/assignments/current/:role/:userId/', controller.getCurrentAssignments);
router.get('/calendar/:role/:id', controller.getCalendar);
router.get('/classes', controller.getClasses);
router.get('/classes/:classId/students', controller.getClassStudents);
router.get('/classes/:classId/students/:studentId/grades', controller.getStudentClassGrades);
router.get('/classes/:classId/threshold', controller.getClassThreshold);
router.get('/classes/:teacherEmail', controller.getTeacherClasses);
router.get('/classesAndAssignments/2', controller.getClassesAndAssignmentsForTeacher);
router.get('/classesAndAssignments/3', controller.getClassesAndAssignmentsForStudent);
router.get('/login', controller.login);
router.get('/login/role/:email', controller.getRoleAtLogin);
router.get('/roles', controller.getRoles);
router.get('/students', controller.getStudents);
// router.get('/students/assignments/:studentId', controller.getStudentAssignments);
// router.get('/students/assignments/:assignmentId', controller.getAssignmentStudents);
// router.get('/assignments/:classId', controller.getAssignments);
router.get('/teachers', controller.getTeachers);
// router.get('/teachers/assignments/:teacherId', controller.getTeacherAssignments);
// router.get('/teachers/calendar/:teacherId', controller.getTeacherCalendar);
router.get('/teachersclasses', controller.getAllTeachersAndTheirClasses);
router.get('/teachersclasses/:id', controller.getTeachersAndClassesForStudent);
router.get('/user/classes/:email', controller.getUserClasses);

// PATCH requests
router.patch('/assignments/submissions', controller.gradeAssignment);

// POST requests
router.post('/assignments', controller.createAssignment);
router.post('/createClass', controller.createClass);
router.post('/classes/students', controller.createClassStudent);
router.post('/createUser', controller.createUser);
router.post('/sendautoemail', controller.sendAutoEmail);
router.post('/sendemail', controller.sendPeerEmail);
router.post('/submitassignment', upload.single('file'), controller.submitAssignment);
router.post('/submittask', controller.submitCalendarTask);

// PUT requests
router.put('/assignments', controller.updateAssignment);
router.put('/edittask', controller.updateCalendar);
router.put('/updateThreshold', controller.updateThreshold);

// DELETE requests
router.delete('/classes/:classId/students/:studentId', controller.deleteClassStudent);
router.delete('/deleteClass/:classId', controller.deleteClass);
router.delete('/deleteUser/:userId/:roleId', controller.deleteUser);
router.delete('/deletetask', controller.deleteCalendar);

module.exports = router;
