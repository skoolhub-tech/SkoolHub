/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './editAssignmentModal.css';
import { useUserData } from '../data-providers/UserDataProvider';

function EditAssignmentModal({
  assignment,
  setEditSubmissionModalIsOpen,
  getClassesAndAssignments,
}) {
  const [assignmentName, setAssignmentName] = useState(assignment.name);
  const [dueDate, setDueDate] = useState(assignment.due_date);
  const [instructions, setInstructions] = useState(assignment.instructions);
  const { userData: { role } } = useUserData();

  function handleSubmitEdit(event) {
    event.preventDefault();
    axios.put('skoolhub/assignments', {
      assignment: {
        name: assignmentName,
        dueDate,
        instructions,
        assignmentId: assignment.id,
      },
      role,
    })
      .then(() => {
        setEditSubmissionModalIsOpen(false);
      })
      .catch((error) => {
        console.error(`Error updating assignment: ${error}`);
      })
      .finally(() => {
        getClassesAndAssignments();
      });
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
              value={dueDate.slice(0, 10)}
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
          <button type="submit" className="view_submissions_button" onClick={() => {}}>Edit Assignment</button>
        </form>
      </div>
    </>
  );
}

export default EditAssignmentModal;

EditAssignmentModal.propTypes = {
  assignment: PropTypes.shape({
    name: PropTypes.string,
    due_date: PropTypes.string,
    instructions: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  setEditSubmissionModalIsOpen: PropTypes.func.isRequired,
  getClassesAndAssignments: PropTypes.func.isRequired,
};
