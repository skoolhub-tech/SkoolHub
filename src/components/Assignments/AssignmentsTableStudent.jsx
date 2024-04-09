/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import AssignmentsRowStudent from './AssignmentsRowStudent';

function AssignmentsTableStudent({
  data,
  selectedClass,
  getClassesAndAssignmentsForStudent,
  setViewSubmissionModalOpen,
  setAssignmentId,
  viewSubmissionModalOpen,
}) {
  return (
    <table className="assignments_table_student">
      <thead>
        <tr>
          <th>Assignment</th>
          <th>Due Date</th>
          <th>Submitted On</th>
        </tr>
      </thead>
      <tbody>
        {data
          .find((classObj) => classObj.name === selectedClass)
          .assignments.map((assignment) => (
            <AssignmentsRowStudent
              key={assignment.id}
              assignment={assignment}
              getClassesAndAssignmentsForStudent={getClassesAndAssignmentsForStudent}
              setViewSubmissionModalOpen={setViewSubmissionModalOpen}
              setAssignmentId={setAssignmentId}
              viewSubmissionModalOpen={viewSubmissionModalOpen}
            />
          ))}
      </tbody>
    </table>
  );
}

export default AssignmentsTableStudent;

AssignmentsTableStudent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedClass: PropTypes.string.isRequired,
  getClassesAndAssignmentsForStudent: PropTypes.func.isRequired,
  setViewSubmissionModalOpen: PropTypes.func.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
  viewSubmissionModalOpen: PropTypes.bool.isRequired,
};
