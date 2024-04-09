/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import AssignmentsRowTeacher from './AssignmentsRowTeacher';

function AssignmentsTableTeacher({
  data,
  selectedClass,
  setAssignmentId,
  setViewAssignmentSubmissions,
}) {
  return (
    <div>
      <table className="assignments_table_teacher">
        <thead>
          <tr>
            <th>Assignment</th>
            <th>Due Date</th>
            <th>Edit Assignment</th>
            <th>View Submissions</th>
          </tr>
        </thead>
        <tbody>
          {data
            .find((classObj) => classObj.name === selectedClass)
            .assignments.map((assignment) => (
              <AssignmentsRowTeacher
                key={assignment.id}
                assignment={assignment}
                setAssignmentId={setAssignmentId}
                setViewAssignmentSubmissions={setViewAssignmentSubmissions}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentsTableTeacher;

AssignmentsTableTeacher.propTypes = {
  data: PropTypes.array.isRequired,
  selectedClass: PropTypes.string.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
  setViewAssignmentSubmissions: PropTypes.func.isRequired,
};
