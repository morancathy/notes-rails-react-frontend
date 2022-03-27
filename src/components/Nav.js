import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav> 
      <h1>CARDSCAN AI RESEARCH</h1>
      <Link to="/"><div>Home</div></Link>
      <Link to="/profile"><div>Profile</div></Link>  
      <Link to="/login"><div>Log In</div></Link>    
    </nav>
  )
};

export default Nav;