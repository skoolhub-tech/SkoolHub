/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { useUserData } from '../data-providers/UserDataProvider';
import SubmitAssignmentButton from './SubmitAssignmentButton';
import ViewSubmittedAssignmentButton from './ViewSubmittedAssignmentButton';
import ViewAssignmentButton from './ViewAssignmentButton';

function AssignmentsRow({
  assignment,
  getClassesAndAssignmentsForStudent,
  setViewSubmissionModalOpen,
  viewSubmissionModalOpen,
  setAssignmentId,
}) {
  const { userData: { email } } = useUserData();

  function getOrdinalIndicator(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  function formatDate(dateString) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${months[monthIndex]} ${day}${getOrdinalIndicator(day)}, ${year}`;
  }

  return (
    <tr>
      <td>{assignment.name}</td>
      <td>{formatDate(assignment.due_date)}</td>
      <td>{assignment.submitted_on ? formatDate(assignment.submitted_on) : ''}</td>
      <td>
        <ViewAssignmentButton assignment={assignment} />
      </td>
      <td>
        <SubmitAssignmentButton
          studentEmail={email}
          assignmentId={assignment.id}
          getClassesAndAssignmentsForStudent={getClassesAndAssignmentsForStudent}
        />
      </td>
      <td>
        {assignment.submitted_on && (
        <ViewSubmittedAssignmentButton
          assignmentId={assignment.id}
          setAssignmentId={setAssignmentId}
          setViewSubmissionModalOpen={setViewSubmissionModalOpen}
          viewSubmissionModalOpen={viewSubmissionModalOpen}
        />
        )}
      </td>
    </tr>
  );
}

export default AssignmentsRow;

AssignmentsRow.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    due_date: PropTypes.string,
    submitted_on: PropTypes.string,
  }).isRequired,
  getClassesAndAssignmentsForStudent: PropTypes.func.isRequired,
  setViewSubmissionModalOpen: PropTypes.func.isRequired,
  viewSubmissionModalOpen: PropTypes.bool.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
};
