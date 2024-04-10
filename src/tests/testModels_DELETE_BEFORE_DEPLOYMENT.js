// For testing database models
// DELETE BEFORE DEPLOYMENT
const {
  createAssignment,
} = require('../../server/model');

async function testModels() {
  const testResults = {};

  try {
    const assignment = { classId: 1, name: 'test', dueDate: '2024-04-09T00:00:00.000Z', instructions: 'test', teacherId: 1 }
    const role = 2;
    const submissions = await createAssignment(assignment);
    testResults.getSubmissionsForAssignment = submissions;
  } catch (err) {
    testResults.getSubmissionsForAssignment = err;
  }

  console.log('Test Results:');
  Object.keys(testResults).forEach((key) => {
    console.log(`${JSON.stringify(key)}: ${JSON.stringify(testResults[key])}`);
  });
}

testModels();
