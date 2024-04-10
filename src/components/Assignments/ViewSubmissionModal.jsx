/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { getDocument } from 'pdfjs-dist/webpack.mjs';
import PropTypes from 'prop-types';
import './viewSubmissionModal.css';

function ViewSubmissionModal({
  classId, assignmentId, studentId, onCloseModal,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchAndRenderPDF = async () => {
      try {
        const response = await axios.get(`/skoolhub/assignment/?classId=${classId}&assignmentId=${assignmentId}&studentId=${studentId}`, {
          responseType: 'blob',
        });

        const reader = new FileReader();
        reader.readAsArrayBuffer(response.data);
        reader.onloadend = async () => {
          const arrayBuffer = reader.result;

          const pdfDoc = await getDocument({ data: arrayBuffer }).promise;

          const page = await pdfDoc.getPage(1);

          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport,
          };

          await page.render(renderContext).promise;
        };
      } catch (error) {
        console.error('Error fetching or rendering the PDF:', error);
      }
    };

    if (classId && studentId) {
      fetchAndRenderPDF(classId, studentId);
    }
  }, [classId, studentId]);

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      onCloseModal();
    }
  };

  useEffect(() => {
    const modal = document.querySelector('.view_submission_modal');
    if (modal) {
      modal.focus();
    }

    return () => {
      if (modal) {
        modal.blur();
      }
    };
  }, []);

  return (classId && studentId) ? (
    <div
      className="view_submission_modal"
      onClick={handleBackgroundClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="View Submission Modal"
    >
      <div className="canvas_container">
        <canvas ref={canvasRef} />
      </div>
    </div>
  ) : null;
}

export default ViewSubmissionModal;

ViewSubmissionModal.propTypes = {
  classId: PropTypes.number.isRequired,
  assignmentId: PropTypes.number.isRequired,
  studentId: PropTypes.number.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
