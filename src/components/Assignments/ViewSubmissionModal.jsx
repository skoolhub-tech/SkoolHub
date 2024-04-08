import React, { useEffect, useRef } from 'react';
import axios from 'axios'; // Import Axios
import { getDocument } from 'pdfjs-dist/pdf';
import { pdfjs } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.3/pdf.worker.min.js';

function ViewSubmissionModal({ classId, assignmentId, studentId }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchAndRenderPDF = async () => {
      try {
        // Use Axios to get the PDF file as a Blob
        const response = await axios.get(`http://${process.env.SERVER_IP}:${process.env.PORT}/assignment/?classId=${classId}&assignmentId=${assignmentId}&studentId=${studentId}`, {
          responseType: 'blob',
        });

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
  ) : null;
}

export default ViewSubmissionModal;
