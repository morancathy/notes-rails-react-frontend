import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from '../components/Nav'
import Home from '../pages/Home'
import LogIn from '../pages/LogIn'
import CardDetails from '../pages/CardDetails'
import Profile from '../pages/Profile'

export const App = (props) => {
  return (
  <>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/carddetails" element={<CardDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  </>);
};