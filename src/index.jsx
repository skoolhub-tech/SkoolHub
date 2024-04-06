import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserDataProvider } from './components/data-providers/UserDataProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserDataProvider>
    <App />
  </UserDataProvider>,
);
