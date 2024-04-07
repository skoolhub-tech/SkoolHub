// For testing database models
// DELETE BEFORE DEPLOYMENT
const {
  getAssignmentDueDate,
  getClassIdFromAssignmentId,
  getStudentIdFromEmail,
  insertUpdateSubmittedAssignment,
  getClassesFromEmail,
} = require('../../server/model');

async function testModels() {
  const testResults = {};

  try {
    testResults.dueDate = await getAssignmentDueDate(1);
  } catch (error) {
    testResults.dueDate = `Failed with error: ${error.message}`;
  }

  try {
    testResults.classId = await getClassIdFromAssignmentId(1);
  } catch (error) {
    testResults.classId = `Failed with error: ${error.message}`;
  }

  try {
    testResults.studentId = await getStudentIdFromEmail('joshua.king@gmail.com');
  } catch (error) {
    testResults.studentId = `Failed with error: ${error.message}`;
  }

  try {
    testResults.submittedAssignment = await insertUpdateSubmittedAssignment(19, 1, 'path/to/file.pdf');
  } catch (error) {
    testResults.submittedAssignment = `Failed with error: ${error.message}`;
  }

  try {
    testResults.classesFromEmail = await getClassesFromEmail('joshua.king@gmail.com');
  } catch (error) {
    testResults.classesFromEmail = `Failed with error: ${error.message}`;
  }

  console.log('Test Results:');
  Object.keys(testResults).forEach((key) => {
    console.log(`${JSON.stringify(key)}: ${JSON.stringify(testResults[key])}`);
  });
}

testModels();
