import React from 'react';
import PropTypes from 'prop-types';

function StudentTable({ students, handleStudentClick }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>View Grades</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>
              <button type="button" onClick={() => handleStudentClick(student)}>View Grades</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

StudentTable.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  handleStudentClick: PropTypes.func.isRequired,
};

export default StudentTable;
