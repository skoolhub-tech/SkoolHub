/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaBookOpen } from 'react-icons/fa';
import formatDate from '../../utils/formatDate_Month_D_Y';

function SubmittedAssignmentsRow({
  submission,
  setStudentId,
  setViewSubmissionModalOpen,
  setAssignmentId,
  setGradeSubmissionModalOpen,
  setSubmissionToGrade,
}) {
  function handleViewSubmissionClick() {
    setAssignmentId(submission.assignment_id);
    setStudentId(submission.student_id);
    setViewSubmissionModalOpen(true);
  }

  function handleGradeSubmissionClick() {
    setSubmissionToGrade(submission);
    setStudentId(submission.student_id);
    setGradeSubmissionModalOpen(true);
  }

  return (
    <tr className="submitted_assignment_row">
      <td>{submission.student_name}</td>
      <td>{formatDate(submission.submitted_on)}</td>
      <td className="submission-grade">{submission.grade}</td>
      <td className="view_submission">
        <button type="button" onClick={handleViewSubmissionClick}><FaMagnifyingGlass size={15} /></button>
      </td>
      <td className="grade_submission">
        <button type="button" onClick={handleGradeSubmissionClick}><FaBookOpen size={15} /></button>
      </td>
    </tr>
  );
}

export default SubmittedAssignmentsRow;

SubmittedAssignmentsRow.propTypes = {
  submission: PropTypes.shape({
    student_name: PropTypes.string,
    submitted_on: PropTypes.string,
    grade: PropTypes.string,
    student_id: PropTypes.number,
    assignment_id: PropTypes.number,
  }).isRequired,
  setStudentId: PropTypes.func.isRequired,
  setViewSubmissionModalOpen: PropTypes.func.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
  setGradeSubmissionModalOpen: PropTypes.func.isRequired,
  setSubmissionToGrade: PropTypes.func.isRequired,
};
