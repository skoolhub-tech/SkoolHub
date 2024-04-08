const { getAllTeachersAndTheirClasses } = require('../model');

module.exports = async (req, res) => {
  try {
    const teachersAndClasses = await getAllTeachersAndTheirClasses();
    res.status(200).send(teachersAndClasses);
  } catch (err) {
    res.status(500).send('Error getting Teachers and Classes for student');
  }
};
