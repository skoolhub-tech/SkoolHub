/* eslint-disable no-console */
/* eslint-disable new-cap */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import './submitAssignmentModal.css';
import { VscError } from 'react-icons/vsc';
import { BsFillFileEarmarkCheckFill } from 'react-icons/bs';

function SubmitAssignmentModal({
  setSubmitAssignmentModalIsOpen,
  studentEmail,
  assignmentId,
  getClassesAndAssignments,
  setNotify,
  setMessage,
  setColor,
  setIcon,
}) {
  const handleFileSubmit = async (file) => {
    const formData = new FormData();

    const submitToServer = (fileData) => {
      axios.post('/skoolhub/submitassignment', fileData)
        .then(() => {
          setNotify();
          setMessage('Assignment successfully submitted.');
          setColor(0);
          setIcon(<BsFillFileEarmarkCheckFill />);
          getClassesAndAssignments();
        }).catch(() => {
          setNotify();
          setMessage('Error submitting assignment.');
          setColor(1);
          setIcon(<VscError />);
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
        const format = file.type.split('/')[1].toUpperCase();
        pdf.addImage(
          imgData,
          format,
          0,
          0,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight(),
        );
        const pdfBlob = pdf.output('blob');
        formData.append('file', pdfBlob, 'converted.pdf');
        submitToServer(formData);
      };
      reader.readAsDataURL(file);
    } else {
      setNotify();
      setMessage('Please upload a PDF or image file.');
      setColor(1);
      setIcon(<VscError />);
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
  getClassesAndAssignments: PropTypes.func.isRequired,
  setNotify: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  setIcon: PropTypes.func.isRequired,
};
