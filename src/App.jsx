import React from 'react';
import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Calendar from './Task_list/Calendar';

function App() {
  return (
    <div className="login-page">
      <h1 className="login-h1">SkoolHub</h1>
      <p>Tedious out. Teaching in.</p>
      <Login />
      {/*</div>// <div>
    //   <Router>
    //     <NavBar />
    //     <Routes>
    //       <Route path="/skoolhub/assignments" element={<h1>Assignments</h1>} />
    //       <Route path="/skoolhub/events" element={<Calendar />} />
    //       <Route path="/skoolhub/classes" element={<h1>Classes</h1>} />
    //       <Route path="/skoolhub/emails" element={<h1>Emails</h1>} />
    //     </Routes>
    //   </Router>

    // </div> */}
    </div>
  );
}

export default App;
