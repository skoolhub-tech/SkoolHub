/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { getDocument } from 'pdfjs-dist/webpack.mjs';
import PropTypes from 'prop-types';

function ViewSubmissionModal({ classId, assignmentId, studentId }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchAndRenderPDF = async () => {
      try {
        console.log(`Fetching PDF for class ${classId}, assignment ${assignmentId}, student ${studentId}`);
        // Use Axios to get the PDF file as a Blob
        const response = await axios.get(`http://${process.env.SERVER_IP}:${process.env.PORT}/skoolhub/assignment/?classId=${classId}&assignmentId=${assignmentId}&studentId=${studentId}`, {
          responseType: 'blob',
        });
        console.log(`Response size: ${response.data.size}`); // Log the Blob size to see if it's fully loaded

        // Create a reader to convert the blob to an ArrayBuffer
        const reader = new FileReader();
        reader.readAsArrayBuffer(response.data);
        reader.onloadend = async () => {
          const arrayBuffer = reader.result;

          const pdfDoc = await getDocument({ data: arrayBuffer }).promise;
          console.log('PDF loaded');

          const page = await pdfDoc.getPage(1);
          console.log('Page loaded');

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
          console.log('Page rendered');
        };
      } catch (error) {
        console.error('Error fetching or rendering the PDF:', error);
      }
    };

    if (classId && studentId) {
      fetchAndRenderPDF(classId, studentId);
    }
  }, [classId, studentId]);

  return (classId && studentId) ? (
    <div className="view_submission_modal">
      <canvas ref={canvasRef} />
    </div>
  ) : (
    <div className="view_submission_modal">
      <h2>No submission to view</h2>
      <p>
        class id:
        {classId}
        , student id:
        {studentId}
      </p>
    </div>
  );
}

export default ViewSubmissionModal;

ViewSubmissionModal.propTypes = {
  classId: PropTypes.number.isRequired,
  assignmentId: PropTypes.number.isRequired,
  studentId: PropTypes.number.isRequired,
};