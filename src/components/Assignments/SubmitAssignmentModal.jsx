/* eslint-disable no-console */
/* eslint-disable new-cap */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { jsPDF } from 'jspdf';
import axios from 'axios';

function SubmitAssignmentModal({
  setSubmitAssignmentModalIsOpen,
  studentEmail,
  assignmentId,
  getClassesAndAssignmentsForStudent,
}) {
  const handleFileSubmit = async (file) => {
    const formData = new FormData();

    const submitToServer = (fileData) => {
      axios.post(`http://${process.env.SERVER_IP}:${process.env.PORT}/skoolhub/submitassignment`, fileData)
        .then((response) => {
          //
          //
          //
          // REPLACE CONSOLE.LOG WITH MODAL DISPLAYING SUCCESS/ERROR MESSAGE
          console.log('*MODIFY SubmitAssignmentModal to display success/error message* Success:', response);
          // REPLACE CONSOLE.LOG WITH MODAL DISPLAYING SUCCESS/ERROR MESSAGE
          //
          //
          //
          getClassesAndAssignmentsForStudent();
        }).catch((error) => {
          console.error('Error:', error);
        });
    };

    formData.append('studentEmail', studentEmail);
    formData.append('assignmentId', assignmentId.toString());

    if (file.type === 'application/pdf') {
      formData.append('file', file, file.name);
      submitToServer(formData);
    } else if (file.type.includes('image')) {
      const pdf = new jsPDF();
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgData = e.target.result;
        pdf.addImage(imgData, 'PNG', 0, 0);
        const pdfBlob = pdf.output('blob');
        formData.append('file', pdfBlob, 'converted.pdf');
        submitToServer(formData);
      };
      reader.readAsDataURL(file);
    } else {
      console.log('File type not supported for direct conversion to PDF.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = event.target.file.files[0];
    handleFileSubmit(file);
    setSubmitAssignmentModalIsOpen(false);
  };

  return (
    <div className="view-submission-modal-container" style={{ position: 'absolute' }}>
      <form className="submission-form" onSubmit={handleSubmit}>
        <input className="submission-input" type="file" name="file" accept=".png, .pdf" required />
        <div className="modal-buttons">
          <button type="submit">Upload</button>
          <button type="button" onClick={() => setSubmitAssignmentModalIsOpen(false)}>Close</button>
        </div>
      </form>
    </div>
  );
}

export default SubmitAssignmentModal;

SubmitAssignmentModal.propTypes = {
  setSubmitAssignmentModalIsOpen: PropTypes.func.isRequired,
  studentEmail: PropTypes.string.isRequired,
  assignmentId: PropTypes.number.isRequired,
  getClassesAndAssignmentsForStudent: PropTypes.func.isRequired,
};
