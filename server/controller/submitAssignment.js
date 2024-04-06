const fs = require('fs').promises;
const path = require('path');
const { getStudentIdFromEmail, getClassIdFromAssignmentId } = require('../model');

module.exports = async (req, res) => {
  const { studentEmail, assignmentId, fileData } = req.body;

  try {
    const studentId = await getStudentIdFromEmail(studentEmail);
    const classId = await getClassIdFromAssignmentId(assignmentId);

    const filePath = path.join(__dirname, '..', 'documents', String(classId), String(assignmentId), `${studentId}.pdf`);

    await fs.mkdir(path.dirname(filePath), { recursive: true });

    await fs.writeFile(filePath, fileData);

    res.send({ message: 'Assignment Submitted!' }).status(200);
  } catch (error) {
    res.send({ message: 'Error submitting the assignment.', error }).status(500);
  }
};
