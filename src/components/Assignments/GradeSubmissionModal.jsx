/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import './gradeSubmissionModal.css';

function GradeSubmissionModal({ setGradeSubmissionModalOpen }) {
  const [grade, setGrade] = useState('');
  const [score, setScore] = useState('');
  const [totalPoints, setTotalPoints] = useState('');
  const [feedback, setFeedback] = useState('');

  function handleSubmitGrade(event) {
    event.preventDefault();
    setGradeSubmissionModalOpen(false);
  }

  function handleOverlayKeypress(event) {
    if (event.key === 'Escape') {
      setGradeSubmissionModalOpen(false);
    }
  }

  return (
    <>
      <label htmlFor="modal-overlay" className="modal-overlay-label">Modal Overlay</label>
      <button
        id="modal-overlay"
        className="modal-overlay"
        onClick={() => setGradeSubmissionModalOpen(false)}
        onKeyPress={handleOverlayKeypress}
        type="button"
        tabIndex={0}
      />
      <div className="grade_submission_modal">
        <h2>Grade Submission</h2>
        <form onSubmit={handleSubmitGrade}>
          <label htmlFor="score">%Score: </label>
          <input type="text" id="score" name="score" value={score} onChange={(e) => setScore(e.target.value)} />
          <br />
          <label htmlFor="total_points">Total Points: (X / Y) </label>
          <input type="text" id="total_points" name="total_points" value={totalPoints} onChange={(e) => setTotalPoints(e.target.value)} />
          <br />
          <label htmlFor="grade">Grade: </label>
          <input type="text" id="grade" name="grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
          <br />
          <label htmlFor="feedback">Feedback: </label>
          <textarea id="feedback" name="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
          <br />
          <br />
          <button type="submit">Submit Grade</button>
          <br />
          <br />
        </form>
      </div>
    </>
  );
}

export default GradeSubmissionModal;
