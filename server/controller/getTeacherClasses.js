const { getTeacherClasses } = require('../model');

module.exports = async (req, res) => {
  try {
    const { teacherEmail } = req.params;
    const classes = await getTeacherClasses(teacherEmail);
    res.status(200).send(classes);
  } catch (err) {
    res.status(500).send(err);
  }
};
