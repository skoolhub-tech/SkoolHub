/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function StudentGradesModal({
  studentName, studentId, classId, onClose,
}) {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    axios.get(`/skoolhub/classes/${classId}/students/${studentId}/grades`)
      .then((response) => {
        console.log(response.data);
        setGrades(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [classId, studentId]);

  return (
    <div>
      <h2>
        Grades for
        {' '}
        {studentName}
      </h2>
      <button type="button" onClick={onClose}>Close</button>
      <ul>
        {grades.map((grade) => (
          <li key={grade.id}>
            {grade.id}
            :
            {grade.score}
          </li>
        ))}
      </ul>
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
