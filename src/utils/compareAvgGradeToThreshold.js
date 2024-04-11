import axios from 'axios';

async function compareAvgGradeToThreshold(classId, studentId) {
  Promise.all([
    axios.get(`/skoolhub/classes/${classId}/students/${studentId}/grades`),
    axios.get('/skoolhub/classes'),
    axios.get('/skoolhub/students'),
  ])
    .then(([gradesResponse, classResponse, studentsResponse]) => {
      const studentGrades = gradesResponse.data;
      const totalScore = studentGrades.reduce((acc, grade) => acc + grade.score, 0);
      const totalPossible = studentGrades.reduce((acc, grade) => acc + grade.total_points, 0);
      const average = ((totalScore / totalPossible) * 100).toFixed(2);
      const classDetails = classResponse.data.find((cls) => cls.id === classId);
      if (average < classDetails.threshold) {
        const studentDetails = studentsResponse.data.find((student) => student.id === studentId);
        const emailData = {
          class_name: classDetails.name,
          grade_threshold: classDetails.threshold,
          grade_average: average,
          to_name: studentDetails.name,
          to_email: studentDetails.email,
        };
        axios.post('/skoolhub/sendautoemail', emailData)
          .then(() => 'Auto Email Sent!')
          .catch((error) => error.message);
      }
      return null;
    })
    .catch((error) => error.message);
}

export default compareAvgGradeToThreshold;
