const { createClassStudent } = require('../model');

module.exports = async (req, res) => {
  const { classId, studentId } = req.body;
  try {
    const newClassStudent = await createClassStudent(classId, studentId);
    res.status(201).send(newClassStudent);
  } catch (err) {
    res.status(500).send(err);
  }
};
