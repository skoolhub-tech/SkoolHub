import React from 'react';
import { useData } from '../DataProvider';

function SubmitAssignmentModal() {
  const { submitAssignmentModalIsOpen, setSubmitAssignmentModalIsOpen } = useData();

  if (!submitAssignmentModalIsOpen) return null;

  const handleFileSubmit = (file) => {
    console.log(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = event.target.file.files[0];
    handleFileSubmit(file);
  };

  return (
    <div style={{ position: 'absolute' }}>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" accept=".png, .pdf" required />
        <button type="submit">Upload</button>
        <button type="button" onClick={() => setSubmitAssignmentModalIsOpen(false)}>Close</button>
      </form>
    </div>
  );
}

export default SubmitAssignmentModal;
