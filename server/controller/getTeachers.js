const { getTeachers } = require('../model');

module.exports = async (req, res) => {
  try {
    const teachers = await getTeachers();
    res.status(200).send(teachers);
  } catch (err) {
    res.status(500).send(err);
  }
};
