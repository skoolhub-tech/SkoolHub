/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';

function StudentGradesModal({
  studentName, studentId, classId, onClose,
}) {
  const [grades, setGrades] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    axios.get(`/skoolhub/classes/${classId}/students/${studentId}/grades`)
      .then((response) => {
        console.log(response.data);
        setGrades(response.data);
        // Create chart after grades are fetched and set
        const ctx = chartRef.current.getContext('2d');
        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: response.data.map((grade) => grade.assignment_id),
            datasets: [{
              label: 'Grades',
              data: response.data.map((grade) => grade.score),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
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
      <div>
        <h2>
          Grades for
          {' '}
          {studentName}
        </h2>
        <button type="button" onClick={onClose}>Close</button>
      </div>
      <div className="w-96 h-96">
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
