const router = require('express').Router();
const controller = require('./controller');

// GET requests
// router.get('/roles', controller.getRoles);
// router.get('/admin', controller.getAdmin);
router.get('/classes', controller.getClasses);
// router.get('/teachers', controller.getTeachers);
// router.get('/teachers/assignments/:teacherId', controller.getTeacherAssignments);
// router.get('/teachers/calendar/:teacherId', controller.getTeacherCalendar);
// router.get('/students', controller.getStudents);
// router.get('/students/assignments/:studentId', controller.getStudentAssignments);
// router.get('/students/assignments/:assignmentId', controller.getAssignmentStudents);
// router.get('/assignments/:classId', controller.getAssignments);

// POST requests
router.post('/sendemail', controller.sendPeerEmail);
router.post('/sendautoemail', controller.sendAutoEmail);
// PUT requests

module.exports = router;
