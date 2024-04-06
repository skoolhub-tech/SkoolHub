/* eslint-disable new-cap */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { jsPDF } from 'jspdf';
import axios from 'axios';

function SubmitAssignmentModal({ setSubmitAssignmentModalIsOpen, studentEmail, assignmentId }) {
  const handleFileSubmit = async (file) => {
    const formData = new FormData();

    const submitToServer = (fileData) => {
      const body = { studentEmail, assignmentId, fileData };
      const headers = { 'Content-Type': 'multipart/form-data' };
      axios.post(`http://${process.env.SERVER_IP}:${process.env.PORT}`, body, { headers })
        .then((response) => {
          console.log('Success:', response);
        }).catch((error) => {
          console.error('Error:', error);
        });
    };

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

SubmitAssignmentModal.propTypes = {
  setSubmitAssignmentModalIsOpen: PropTypes.func.isRequired,
  studentEmail: PropTypes.string.isRequired,
  assignmentId: PropTypes.string.isRequired,
};
