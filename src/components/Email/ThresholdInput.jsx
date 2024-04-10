import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function ThresholdInput({ currentClass, setThreshold, threshold, setOpenThreshold }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(threshold);
  }, [threshold]);

  const handleSetThreshold = () => {
    setOpenThreshold(false);
    axios.put('skoolhub/updateThreshold', {
      newThreshold: inputValue,
      classId: currentClass.id,
    })
      .then(() => {
        setThreshold(Number(inputValue));
      });
  };

  return (
    <div className="thresholdDiv">
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        exit={{ scale: 0.5 }}
      >
        <div className="thresholdModal">
          <button type="button" onClick={() => setOpenThreshold(false)} className="infoCloseBtn">Back</button>
          <p>
            Enter a grade percentage and we will send an automated email to a student when their grade drops below the threshold for the class!
          </p>
          <div className="inputConfigure">
            <input
              className="thresholdInput"
              type="number"
              id="threshold"
              value={inputValue}
              max="100"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <p className="percent">/100%</p>
          </div>
          <button type="button" onClick={handleSetThreshold} className="thresholdButton">Set Threshold</button>
        </div>
      </motion.div>
    </div>
  );
}

export default ThresholdInput;
