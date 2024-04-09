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
router.get('/classes', controller.getClasses);
router.get('/classes/:classId/students', controller.getClassStudents);
router.get('/classes/:teacherEmail', controller.getTeacherClasses);
router.get('/classesAndAssignments/students', controller.getClassesAndAssignmentsForStudent);
router.get('/login', controller.login);
router.get('/login/role/:email', controller.getRoleAtLogin);
router.get('/students', controller.getStudents);
router.get('/assignment', (controller.getSubmittedAssignment));
router.get('/classes/:classId/students/:studentId/grades', controller.getStudentClassGrades);
router.get('/teachers', controller.getTeachers);
router.get('/teachersclasses/:id', controller.getTeachersAndClassesForStudent);
router.get('/calendar/:role/:id', controller.getCalendar);
router.get('/teachersclasses', controller.getAllTeachersAndTheirClasses);
router.get('/roles', controller.getRoles);
// router.get('/teachers/assignments/:teacherId', controller.getTeacherAssignments);
// router.get('/teachers/calendar/:teacherId', controller.getTeacherCalendar);
// router.get('/students/assignments/:studentId', controller.getStudentAssignments);
// router.get('/students/assignments/:assignmentId', controller.getAssignmentStudents);
// router.get('/assignments/:classId', controller.getAssignments);

// POST requests
router.post('/sendautoemail', controller.sendAutoEmail);
router.post('/sendemail', controller.sendPeerEmail);
router.post('/submitassignment', upload.single('file'), controller.submitAssignment);
router.post('/submittask', controller.submitCalendarTask);
router.post('/classes/students', controller.createClassStudent);
router.post('/createUser', controller.createUser);
router.post('/createClass', controller.createClass);
// PUT requests
router.put('/edittask', controller.updateCalendar);
//DELETE requests
router.delete('/classes/:classId/students/:studentId', controller.deleteClassStudent);
router.delete('/deleteUser/:userId/:roleId', controller.deleteUser);

module.exports = router;
