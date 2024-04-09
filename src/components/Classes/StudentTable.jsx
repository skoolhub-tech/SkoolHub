import React from 'react';
import PropTypes from 'prop-types';
// import { FaChartLine } from 'react-icons/fa6';
import { FaChartLine } from 'react-icons/fa';

function StudentTable({ students, handleStudentClick }) {
  return (
    <table className="student-table-container">
      <thead>
        <tr>
          <th>Student</th>
          <th>Grades</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td className="student-name">{student.name}</td>
            <td className="grades-button">
              <button
                type="button"
                onClick={() => handleStudentClick(student)}
                style={{ fontSize: '1.5rem' }}
                aria-label={`View grades for ${student.name}`}
              >
                <FaChartLine />
              </button>
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
