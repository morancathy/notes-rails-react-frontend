import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from '../components/Nav.jsx'
import Home from '../pages/Home.jsx'
import LogIn from '../pages/LogIn.jsx'

export const App = (props) => {
  return (
  <>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  </>);
};