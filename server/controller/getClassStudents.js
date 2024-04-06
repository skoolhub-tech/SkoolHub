const { getClassStudents } = require('../model');

module.exports = async (req, res) => {
  try {
    const { classId } = req.params;
    const students = await getClassStudents(classId);
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send(err);
  }
};
