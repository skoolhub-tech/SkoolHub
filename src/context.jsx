/* eslint-disable import/no-self-import */
import React, { useContext } from 'react';
import CounterContext from './context';

function CounterDisplay() {
  const { count } = useContext(CounterContext);

  return (
    <div>
      Count:
      {count}
    </div>
  );
}

export default CounterDisplay;
