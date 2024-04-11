/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './editAssignmentModal.css';

function EditAssignmentModal({
  assignment,
  setEditSubmissionModalIsOpen,
}) {
  const [assignmentName, setAssignmentName] = useState(assignment.name);
  const [dueDate, setDueDate] = useState(assignment.due_date);
  const [instructions, setInstructions] = useState(assignment.instructions);

  function handleSubmitEdit(event) {
    event.preventDefault();
    setEditSubmissionModalIsOpen(false);
  }

  function handleOverlayKeypress(event) {
    if (event.key === 'Escape') {
      setEditSubmissionModalIsOpen(false);
    }
  }

  return (
    <>
      <div
        className="edit_assignment_modal_overlay"
        onClick={() => setEditSubmissionModalIsOpen(false)}
        onKeyPress={handleOverlayKeypress}
        type="button"
      />
      <div className="edit_assignment_modal">
        <h2>
          Edit Assignment:
          {assignment.name}
        </h2>
        <form onSubmit={handleSubmitEdit}>
          <label className="edit-label" htmlFor="assignmentName">
            Assignment Name:
            <input
              type="text"
              id="assignmentName"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
            />
          </label>
          <label className="edit-label" htmlFor="dueDate">
            Due Date:
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
          <label className="edit-label" htmlFor="instructions">
            Instructions:
            <textarea
              id="instructions"
              value={instructions || ''}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </label>
          <button type="button" className="view_submissions_button" onClick={() => {}}>View Submissions</button>
        </form>
      </div>
    </>
  );
}

export default EditAssignmentModal;

EditAssignmentModal.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    due_date: PropTypes.string,
    instructions: PropTypes.string,
  }).isRequired,
  setEditSubmissionModalIsOpen: PropTypes.func.isRequired,
};
