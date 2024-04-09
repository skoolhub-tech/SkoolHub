const { deleteClassStudent } = require('../model');

module.exports = async (req, res) => {
  const { classId, studentId } = req.params;
  try {
    const deletedClassStudent = await deleteClassStudent(classId, studentId);
    res.status(200).send(deletedClassStudent);
  } catch (err) {
    res.status(500).send(err);
  }
};