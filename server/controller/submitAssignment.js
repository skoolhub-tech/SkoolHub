/* eslint-disable consistent-return */
/* eslint-disable no-console */
const fs = require('fs').promises;
const path = require('path');
const {
  getStudentIdFromEmail,
  getClassIdFromAssignmentId,
  insertUpdateSubmittedAssignment,
} = require('../model');

module.exports = async (req, res) => {
  const { studentEmail, assignmentId } = req.body;
  const fileData = req.file.buffer;

  let studentId;
  let classId;

  try {
    try {
      const studentIdResult = await getStudentIdFromEmail(studentEmail);
      studentId = studentIdResult[0].id;

      const classIdResult = await getClassIdFromAssignmentId(assignmentId);
      classId = classIdResult[0].class_id;
    } catch (error) {
      console.log('Error retrieving query parameters');
      return res.send({ message: 'Error submitting the assignment.', error }).status(500);
    }

    const filePath = path.join(__dirname, '..', 'documents', String(classId), String(assignmentId), `${String(studentId)}.pdf`);

    await insertUpdateSubmittedAssignment(studentId, assignmentId, filePath);

    await fs.mkdir(path.dirname(filePath), { recursive: true });

    await fs.writeFile(filePath, fileData);

    res.send('Assignment Submitted!').status(200);
  } catch (error) {
    res.send('Error submitting the assignment.').status(500);
  }
};
