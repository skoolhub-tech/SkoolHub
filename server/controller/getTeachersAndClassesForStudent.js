const { getTeachersAndClasses } = require('../model');

module.exports = async (req, res) => {
  try {
    console.log(req.params.id, 'in controller params.id');
    const { id } = req.params;
    const teachersAndClasses = await getTeachersAndClasses(id);
    res.status(200).send(teachersAndClasses);
  } catch (err) {
    res.status(500).send('Error getting Teachers and Classes for student');
  }
};
