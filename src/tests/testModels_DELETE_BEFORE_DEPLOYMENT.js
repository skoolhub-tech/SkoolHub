// For testing database models
// DELETE BEFORE DEPLOYMENT
const {
  getSubmissionsForAssignment,
} = require('../../server/model');

async function testModels() {
  const testResults = {};

  try {
    const submissions = await getSubmissionsForAssignment(1);
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
