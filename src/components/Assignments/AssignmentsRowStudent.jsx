/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { useUserData } from '../data-providers/UserDataProvider';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import SubmitAssignmentButton from './SubmitAssignmentButton';
import ViewSubmittedAssignmentButton from './ViewSubmittedAssignmentButton';
import formatDate from '../../utils/formatDate_Month_D_Y';

function AssignmentsRow({
  assignment,
  getClassesAndAssignments,
  setViewSubmissionModalOpen,
  viewSubmissionModalOpen,
  setAssignmentId,
  setAssignmentToView,
  submitAssignmentModalIsOpen,
  setSubmitAssignmentModalIsOpen,
  assignmentToSubmit,
  setAssignmentToSubmit,
  setNotify,
  setMessage,
  setColor,
  setIcon,
}) {
  const { userData: { email } } = useUserData();

  return (
    <tr>
      <td className="view-assignment-button" onClick={() => setAssignmentToView(assignment)}>{assignment.name}</td>
      <td>{formatDate(assignment.due_date)}</td>
      <td>{assignment.submitted_on ? formatDate(assignment.submitted_on) : ''}</td>
      <td className="submit-button">
        <SubmitAssignmentButton
          studentEmail={email}
          assignmentId={assignment.id}
          getClassesAndAssignments={getClassesAndAssignments}
          submitAssignmentModalIsOpen={submitAssignmentModalIsOpen}
          setSubmitAssignmentModalIsOpen={setSubmitAssignmentModalIsOpen}
          assignmentToSubmit={assignmentToSubmit}
          setAssignmentToSubmit={setAssignmentToSubmit}
          setNotify={setNotify}
          setMessage={setMessage}
          setColor={setColor}
          setIcon={setIcon}
        />
      </td>
      <td className="view-submit-button">
        {assignment.submitted_on && (
        <ViewSubmittedAssignmentButton
          assignmentId={assignment.id}
          setAssignmentId={setAssignmentId}
          setViewSubmissionModalOpen={setViewSubmissionModalOpen}
          viewSubmissionModalOpen={viewSubmissionModalOpen}
          setSubmitAssignmentModalIsOpen={setSubmitAssignmentModalIsOpen}
        />
        )}
      </td>
    </tr>
  );
}

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
  setAssignmentToView: PropTypes.func.isRequired,
  submitAssignmentModalIsOpen: PropTypes.bool.isRequired,
  setSubmitAssignmentModalIsOpen: PropTypes.func.isRequired,
  assignmentToSubmit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    due_date: PropTypes.string,
    submitted_on: PropTypes.string,
  }),
  setAssignmentToSubmit: PropTypes.func.isRequired,
  setNotify: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  setIcon: PropTypes.func.isRequired,
};

AssignmentsRow.defaultProps = {
  assignmentToSubmit: null,
};

export default AssignmentsRow;
