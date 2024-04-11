import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaCheck } from "react-icons/fa";
import { motion } from 'framer-motion';

function ThresholdInput({
  currentClass,
  setThreshold, threshold, setOpenThreshold,
  setColor, setMessage, setIcon,
  showNotificationTimer
}) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(threshold);
  }, [threshold]);

  const handleSetThreshold = () => {
    setOpenThreshold(false);
    axios.put('skoolhub/updateThreshold', {
      newThreshold: Number(inputValue),
      classId: currentClass.id,
    })
      .then(() => {
        setThreshold(Number(inputValue));
        setColor(0);
        setMessage('Threshold Set!');
        setIcon(<FaCheck />);
        showNotificationTimer();
      });
  };

  return (
    <div className="thresholdDiv">
      <motion.div
        className="thresholdModal"
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        exit={{ scale: 0.5 }}
      >
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
      </motion.div>
    </div>
  );
}

ThresholdInput.propTypes = {
  currentClass: PropTypes.shape({}).isRequired,
  setThreshold: PropTypes.func.isRequired,
  threshold: PropTypes.number.isRequired,
  setOpenThreshold: PropTypes.func.isRequired,
};

export default ThresholdInput;
