import React, { useState } from 'react';
import SubmitAssignmentModal from './SubmitAssignmentModal';

function SubmitAssignmentButton({ studentEmail, assignmentId }) {
  const [submitAssignmentModalIsOpen, setSubmitAssignmentModalIsOpen] = useState(false);
  return (
    <div>
      <button type="button" className="submitAssignmentButtonButton" onClick={() => setSubmitAssignmentModalIsOpen(true)}>Submit Assignment</button>
      {submitAssignmentModalIsOpen && (
      <SubmitAssignmentModal
        setSubmitAssignmentModalIsOpen={setSubmitAssignmentModalIsOpen}
        studentEmail={studentEmail}
        assignmentId={assignmentId}
      />
      )}
    </div>
  );
}

export default SubmitAssignmentButton;
