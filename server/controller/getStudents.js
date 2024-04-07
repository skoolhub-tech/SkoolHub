const { getStudents } = require('../model');

module.exports = async (req, res) => {
  try {
    const students = await getStudents();
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send(err);
  }
};
