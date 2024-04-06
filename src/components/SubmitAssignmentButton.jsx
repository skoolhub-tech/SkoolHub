import React, { useState } from 'react';
import SubmitAssignmentModal from './SubmitAssignmentModal';

function SubmitAssignmentButton() {
  const [submitAssignmentModalIsOpen, setSubmitAssignmentModalIsOpen] = useState(false);
  return (
    <div>
      <button type="button" className="submitAssignmentButtonButton" onClick={() => setSubmitAssignmentModalIsOpen(true)}>Submit Assignment</button>
      {submitAssignmentModalIsOpen && (
      <SubmitAssignmentModal
        setSubmitAssignmentModalIsOpen={setSubmitAssignmentModalIsOpen}
      />
      )}
    </div>
  );
}

export default SubmitAssignmentButton;
