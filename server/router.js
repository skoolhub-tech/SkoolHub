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
router.get('/classesassignments', controller.getClassesAndAssignmentsForStudent);
router.get('/login', controller.login);
router.get('/login/role', controller.getRoleAtLogin);
router.get('/students', controller.getStudents);
router.get('/teachers', controller.getTeachers);
// router.get('/teachers/assignments/:teacherId', controller.getTeacherAssignments);
// router.get('/teachers/calendar/:teacherId', controller.getTeacherCalendar);
// router.get('/students/assignments/:studentId', controller.getStudentAssignments);
// router.get('/students/assignments/:assignmentId', controller.getAssignmentStudents);
// router.get('/assignments/:classId', controller.getAssignments);

// POST requests
router.post('/sendautoemail', controller.sendAutoEmail);
router.post('/sendemail', controller.sendPeerEmail);
router.post('/submitassignment', upload.single('file'), controller.submitAssignment);
// PUT requests

module.exports = router;
