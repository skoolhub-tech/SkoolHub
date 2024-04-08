/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { useUserData } from '../data-providers/UserDataProvider';
import SubmitAssignmentButton from './SubmitAssignmentButton';
import ViewSubmittedAssignmentButton from './ViewSubmittedAssignmentButton';

function AssignmentsRow({ assignment }) {
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
        <SubmitAssignmentButton studentEmail={email} assignmentId={assignment.id} />
      </td>
      <td>
        {/* Only render ViewSubmittedAssignmentButton if assignment.submitted_on is not null */}
        {assignment.submitted_on && <ViewSubmittedAssignmentButton />}
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
};
