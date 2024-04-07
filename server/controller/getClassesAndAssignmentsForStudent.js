const { getClassesFromEmail, getAssignmentsForClass } = require('../model');

module.exports = async (req, res) => {
  try {
    const { email } = req.body;
    const classes = await getClassesFromEmail(email);
    const classesWithAssignments = await Promise.all(classes.map(async (classObj) => {
      const assignments = await getAssignmentsForClass(classObj.id);
      return { ...classObj, assignments };
    }));
    res.status(200).send(classesWithAssignments);
  } catch (err) {
    res.status(500).send('Error getting classes and assignments for student');
  }
};
