const { getStudentClassGrades } = require('../model');

module.exports = async (req, res) => {
  try {
    const { classId, studentId } = req.params;
    const grades = await getStudentClassGrades(classId, studentId);
    res.status(200).send(grades);
  } catch (err) {
    res.status(500).send(err);
  }
};
