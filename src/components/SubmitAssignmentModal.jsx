import React from 'react';
import PropTypes from 'prop-types';
import { jsPDF } from 'jspdf';
import axios from 'axios';

function SubmitAssignmentModal({ setSubmitAssignmentModalIsOpen }) {
  const handleFileSubmit = async (file) => {
    const formData = new FormData();

    const submitToServer = (data) => {
      // INCOMPLETE SECTION!!! COMPLETE AFTER SERVER ENDPOINT/CONTROLLER HAS BEEN BUILT
      //
      //
      // Function to submit the FormData to the server using Axios
      //
      // CONSOLE LOG FOR TESTING --- REMOVE BEFORE DEPLOYMENT
      for (let [key, value] of data.entries()) {
        console.log(key, value);
      }
      // axios.post('YOUR_SERVER_ENDPOINT', data, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // }).then((response) => {
      //   console.log('Success:', response);
      // }).catch((error) => {
      //   console.error('Error:', error);
      // });
      //
      //
      // INCOMPLETE SECTION!!! COMPLETE AFTER SERVER ENDPOINT/CONTROLLER HAS BEEN BUILT
    };

    if (file.type === 'application/pdf') {
      formData.append('file', file, file.name);
      submitToServer(formData);
    } else if (file.type.includes('image')) {
      const pdf = new jsPDF();
      const reader = new FileReader();
      reader.onload = function (e) {
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
};
