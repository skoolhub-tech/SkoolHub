import React from 'react';
import SubmitAssignmentModal from './SubmitAssignmentModal';
import { useData } from '../DataProvider';

function SubmitAssignmentButton() {
  const { setSubmitAssignmentModalIsOpen } = useData();
  return (
    <div>
      <button type="button" className="submitAssignmentButtonButton" onClick={() => setSubmitAssignmentModalIsOpen(true)}>Submit Assignment</button>
      <SubmitAssignmentModal />
    </div>
  );
}

export default SubmitAssignmentButton;
