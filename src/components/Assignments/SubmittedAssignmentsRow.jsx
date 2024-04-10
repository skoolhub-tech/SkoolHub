import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
    <>
      <tr className="submitted_assignment_row">
        <td>{submission.student_name}</td>
        <td>{formatDate(submission.submitted_on)}</td>
        <td>{submission.grade}</td>
        <td>
          <button type="button" className="view_submission" onClick={handleViewSubmissionClick}>View Submission</button>
        </td>
        <td>
          <button className="grade_submission" type="button" onClick={setGradeSubmissionModalOpen}>Grade Submission</button>
        </td>
      </tr>
      {gradeSubmissionModalOpen && (
      <GradeSubmissionModal
        submission={submission}
        setGradeSubmissionModalOpen={setGradeSubmissionModalOpen}
      />
      )}
    </>
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
