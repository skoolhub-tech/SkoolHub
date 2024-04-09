/* eslint-disable no-console */
/* eslint-disable consistent-return */
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  const { classId, assignmentId, studentId } = req.query;

  if (!classId || !assignmentId || !studentId) {
    return res.status(400).send('Request is missing parameters');
  }

  const pdfPath = path.join(__dirname, '..', 'documents', String(classId), String(assignmentId), `${String(studentId)}.pdf`);

  fs.access(pdfPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("Requested PDF doesn't exist");
      return res.status(404).send('PDF not found');
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${studentId}.pdf"`);

    const pdfStream = fs.createReadStream(pdfPath);
    pdfStream.pipe(res);
    pdfStream.on('error', (error) => {
      console.error('Error streaming PDF file:', error);
      res.status(500).send('Internal server error');
    });
  });
};
