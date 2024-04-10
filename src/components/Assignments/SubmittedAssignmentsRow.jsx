/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaBookOpen } from 'react-icons/fa';
import GradeSubmissionModal from './GradeSubmissionModal';
import formatDate from '../../utils/formatDate_Month_D_Y';

function SubmittedAssignmentsRow({
  submission,
  setStudentId,
  setViewSubmissionModalOpen,
  setAssignmentId,
}) {
  const [gradeSubmissionModalOpen, setGradeSubmissionModalOpen] = useState(false);
  function handleViewSubmissionClick() {
    setAssignmentId(submission.submission_id);
    setStudentId(submission.student_id);
    setViewSubmissionModalOpen(true);
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
        <button type="button" onClick={setGradeSubmissionModalOpen}><FaBookOpen size={15} /></button>
      </td>
      {gradeSubmissionModalOpen && (
      <GradeSubmissionModal
        submission={submission}
        setGradeSubmissionModalOpen={setGradeSubmissionModalOpen}
      />
      )}
    </tr>
  );
}

export default SubmittedAssignmentsRow;

SubmittedAssignmentsRow.propTypes = {
  submission: PropTypes.shape({
    student_name: PropTypes.string,
    submitted_on: PropTypes.string,
    grade: PropTypes.string,
    submission_id: PropTypes.number,
    student_id: PropTypes.number,
  }).isRequired,
  setStudentId: PropTypes.func.isRequired,
  setViewSubmissionModalOpen: PropTypes.func.isRequired,
  setAssignmentId: PropTypes.func.isRequired,
};
