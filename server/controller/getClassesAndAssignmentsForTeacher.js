/* eslint-disable no-console */
const { getClassesFromTeacherEmail, getAssignmentsForClass } = require('../model');

module.exports = async (req, res) => {
  try {
    const { email } = req.query;
    const classes = await getClassesFromTeacherEmail(email);
    const classesWithAssignments = await Promise.all(classes.map(async (classObj) => {
      const assignments = await getAssignmentsForClass(classObj.id);

      return { ...classObj, assignments };
    }));

    res.status(200).send(classesWithAssignments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting classes and assignments for student');
  }
};
