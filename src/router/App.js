import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from '../components/Nav'
import Home from '../pages/Home'
import LogIn from '../pages/LogIn'

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