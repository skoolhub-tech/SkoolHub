/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AssignmentsRowStudent from './AssignmentsRowStudent';
import ViewAssignmentModalStudent from './ViewAssignmentModalStudent';

function AssignmentsTableStudent({
  data,
  selectedClass,
  getClassesAndAssignments,
  setViewSubmissionModalOpen,
  setAssignmentId,
  viewSubmissionModalOpen,
  submitAssignmentModalIsOpen,
  setSubmitAssignmentModalIsOpen,
}) {
  const [assignmentToView, setAssignmentToView] = useState(null);
  const [assignmentToSubmit, setAssignmentToSubmit] = useState(null);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Assignment</th>
            <th>Due Date</th>
            <th>Submitted On</th>
            <th>Submit Assignment</th>
            <th>View Submission</th>
          </tr>
        </thead>
        <tbody>
          {data
            .find((classObj) => classObj.name === selectedClass)
            .assignments.map((assignment) => (
              <AssignmentsRowStudent
                key={assignment.id}
                assignment={assignment}
                getClassesAndAssignments={getClassesAndAssignments}
                setViewSubmissionModalOpen={setViewSubmissionModalOpen}
                setAssignmentId={setAssignmentId}
                viewSubmissionModalOpen={viewSubmissionModalOpen}
                setAssignmentToView={setAssignmentToView}
                submitAssignmentModalIsOpen={submitAssignmentModalIsOpen}
                setSubmitAssignmentModalIsOpen={setSubmitAssignmentModalIsOpen}
                assignmentToSubmit={assignmentToSubmit}
                setAssignmentToSubmit={setAssignmentToSubmit}
              />
            ))}
        </tbody>
      </table>
      {assignmentToView && (
      <ViewAssignmentModalStudent
        assignment={assignmentToView}
        setAssignmentToView={setAssignmentToView}
      />
      )}
    </>
  );
}

export default AssignmentsTableStudent;

AssignmentsTableStudent.propTypes = {
  data: PropTypes.array.isRequired,
  selectedClass: PropTypes.string.isRequired,
  getClassesAndAssignments: PropTypes.func.isRequired,
  setViewSubmissionModalOpen: PropTypes.func.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
  viewSubmissionModalOpen: PropTypes.bool.isRequired,
  submitAssignmentModalIsOpen: PropTypes.bool.isRequired,
  setSubmitAssignmentModalIsOpen: PropTypes.func.isRequired,
};
