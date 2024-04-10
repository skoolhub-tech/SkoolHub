import axios from 'axios';
import sendAutoEmail from './sendAutoEmail';

// returns an object with bool true if the student's average grade is below the threshold
// use this object to fill
async function compareAvgGradeToThreshold(classId, studentId) {
  Promise.all([
    axios.get(`/skoolhub/classes/${classId}/students/${studentId}`),
    axios.get(`/skoolhub/classes/${classId}/threshold`),
  ])
    .then((gradesResponse, thresholdResponse) => {
      const studentGrades = gradesResponse.data;
      const totalScore = studentGrades.reduce((acc, grade) => acc + grade.score, 0);
      const totalPossible = studentGrades.reduce((acc, grade) => acc + grade.total_points, 0);
      const average = ((totalScore / totalPossible) * 100).toFixed(2);
      const threshold = thresholdResponse.data[0].threshold;
      if (average < threshold) {
        return { bool: true, average, threshold };
      }
      return { bool: false, average, threshold };
    });
}

export default compareAvgGradeToThreshold;
