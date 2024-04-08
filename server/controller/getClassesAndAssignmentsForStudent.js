/* eslint-disable no-console */
const { getClassesFromEmail, getAssignmentsForClass, getSubmittedOnDateForAssignment } = require('../model');

module.exports = async (req, res) => {
  try {
    const { email } = req.query;
    const classes = await getClassesFromEmail(email);
    const classesWithAssignments = await Promise.all(classes.map(async (classObj) => {
      const assignments = await getAssignmentsForClass(classObj.id);

      const assignmentsWithSubmittedOn = await Promise.all(assignments.map(async (assignment) => {
        const submittedOn = (await getSubmittedOnDateForAssignment(assignment.id, email))[0]?.submitted_on || null;
        return { ...assignment, submitted_on: submittedOn };
      }));

      return { ...classObj, assignments: assignmentsWithSubmittedOn };
    }));

    res.status(200).send(classesWithAssignments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting classes and assignments for student');
  }
};
