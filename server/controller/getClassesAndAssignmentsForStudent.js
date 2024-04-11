/* eslint-disable no-console */
const { getClassesFromStudentEmail, getAssignmentsForClass, getSubmittedAssignmentInfo } = require('../model');

module.exports = async (req, res) => {
  try {
    const { email } = req.query;
    const classes = await getClassesFromStudentEmail(email);
    const classesWithAssignments = await Promise.all(classes.map(async (classObj) => {
      const assignments = await getAssignmentsForClass(classObj.id);

      const assignmentsWithInfo = await Promise.all(assignments.map(async (assignment) => {
        const info = (await getSubmittedAssignmentInfo(assignment.id, email))[0] || null;
        return { ...assignment, ...info };
      }));

      return { ...classObj, assignments: assignmentsWithInfo };
    }));

    res.status(200).send(classesWithAssignments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting classes and assignments for student');
  }
};
