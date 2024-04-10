import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ThresholdInput({ currentClass, setThreshold, threshold, setOpenThreshold}) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(threshold);
  }, [threshold]);

  const handleSetThreshold = () => {
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
      <div className="thresholdModal">
        <button onClick={() => setOpenThreshold(false)} className="infoCloseBtn">Back</button>
        <p>
          {'Enter a grade percentage and we will send an automated email to a student when their grade drops below the threshold for the class!'}
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
        <button onClick={handleSetThreshold} className="thresholdButton">Set Threshold</button>
      </div>
    </div>
  );
}

export default ThresholdInput;
