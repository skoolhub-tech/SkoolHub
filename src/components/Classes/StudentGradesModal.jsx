/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';

function StudentGradesModal({
  studentName, studentId, classId, onClose,
}) {
  const [grades, setGrades] = useState([]);
  const [averageGrade, setAverageGrade] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    axios.get(`/skoolhub/classes/${classId}/students/${studentId}/grades`)
      .then((response) => {
        const studentGrades = response.data;
        setGrades(response.data);
        const totalScore = studentGrades.reduce((acc, grade) => acc + grade.score, 0);
        const average = (totalScore / studentGrades.length).toFixed(2);
        setAverageGrade(average);
        // Create chart after grades are fetched and set
        const ctx = chartRef.current.getContext('2d');
        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: studentGrades.map((grade) => grade.assignment_id),
            datasets: [{
              label: 'Grades',
              data: studentGrades.map((grade) => grade.score),
              backgroundColor: 'rgba(135, 93, 59, 0.2)',
              borderColor: 'rgba(135, 93, 59, 1)',
              borderWidth: 3,
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
              },
            },
            maintainAspectRatio: false,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [classId, studentId]);

  return (
    <div>
      <div className="modal-header">
        <h2>
          Grades for
          {' '}
          {studentName}
          :
        </h2>
      </div>
      <div className="modal-btn">
        <button type="button" onClick={onClose}>Close</button>
      </div>
      <div className="modal-avg">
        Average:
        {' '}
        {averageGrade}
      </div>
      <div className="grade-chart" style={{ width: '300px', height: '300px' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}

StudentGradesModal.propTypes = {
  studentName: PropTypes.string.isRequired,
  studentId: PropTypes.number.isRequired,
  classId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default StudentGradesModal;
