/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { getDocument } from 'pdfjs-dist/webpack.mjs';
import PropTypes from 'prop-types';
import './viewSubmissionModal.css';
import { VscError } from 'react-icons/vsc';

function ViewSubmissionModal({
  classId,
  assignmentId,
  studentId,
  onCloseModal,
  setNotify,
  setMessage,
  setColor,
  setIcon,
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
        setNotify();
        setMessage('Unable to display file.');
        setColor(1);
        setIcon(<VscError />);
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

  const handleKeyPress = (event) => {
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
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label="View Submission Modal"
    >
      <motion.div
        className="assignments_motion_div"
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        exit={{ scale: 0.5 }}
        onClick={handleBackgroundClick}
        onKeyPress={handleKeyPress}
      >
        <div className="canvas_container">
          <canvas ref={canvasRef} />
        </div>
      </motion.div>
    </div>
  ) : null;
}

export default ViewSubmissionModal;

ViewSubmissionModal.propTypes = {
  classId: PropTypes.number.isRequired,
  assignmentId: PropTypes.number.isRequired,
  studentId: PropTypes.number.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  setNotify: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  setIcon: PropTypes.func.isRequired,
};
