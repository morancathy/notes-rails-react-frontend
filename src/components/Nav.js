import React from 'react';
import {Link} from 'react-router-dom'

const Nav = (props) => {
    return (
            <nav> 
                <Link to="/"><div>Home</div></Link>
                <Link to="/login"><div>Log In</div></Link>           
            </nav>
    )
};

export default Nav;