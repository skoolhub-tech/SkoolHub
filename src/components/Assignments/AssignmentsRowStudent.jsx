/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { useUserData } from '../data-providers/UserDataProvider';
import SubmitAssignmentButton from './SubmitAssignmentButton';
import ViewSubmittedAssignmentButton from './ViewSubmittedAssignmentButton';
import formatDate from '../../utils/formatDate_Month_D_Y';

function AssignmentsRow({
  assignment,
  getClassesAndAssignments,
  setViewSubmissionModalOpen,
  viewSubmissionModalOpen,
  setAssignmentId,
}) {
  const { userData: { email } } = useUserData();

  return (
    <tr>
      <td className="view-assignment-button">{assignment.name}</td>
      <td>{formatDate(assignment.due_date)}</td>
      <td>{assignment.submitted_on ? formatDate(assignment.submitted_on) : ''}</td>
      <td className="submit-button">
        <SubmitAssignmentButton
          studentEmail={email}
          assignmentId={assignment.id}
          getClassesAndAssignments={getClassesAndAssignments}
        />
      </td>
      <td className="view-submit-button">
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
  getClassesAndAssignments: PropTypes.func.isRequired,
  setViewSubmissionModalOpen: PropTypes.func.isRequired,
  viewSubmissionModalOpen: PropTypes.bool.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
};
