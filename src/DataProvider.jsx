import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Context = React.createContext();
const { useState, useEffect, useContext } = React;

// Data provider component
export function DataProvider({ children }) {
  const [data, setData] = useState({});

  // Set to perform some get request on mount
  useEffect(() => {
    axios.get(/* path */)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Returns wrapper component for all components
  // Pass state and methods to value prop for access in other components
  return (
    <Context.Provider value={data /* additional state, methods */}>
      {children}
    </Context.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(Context);

// To access state and methods inside this component,
// import { useData } from './path/to/DataProvider'
// then inside your component,
// const { state/method } = useData();
