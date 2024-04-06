import React from 'react';
import ReactDOM from 'react-dom/client';
import { DataProvider } from './DataProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <DataProvider>
    <App />
  </DataProvider>,
);
