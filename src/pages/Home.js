import React, {useState, useEffect, Component} from 'react';
import CardScan from '../components/CardScan';

const Home = (props) => {
	const [token, setToken] = useState('');
	const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
		if (window.localStorage.getItem('token')) {
			setToken(window.localStorage.getItem('token'));
			setLoggedInUser(window.localStorage.getItem('loggedInUser'));
		}
	}, []);    
    
	return (
		<>
			<div className='Home'>
				{!token ? (
					<header>~ Please Log In ~</header>
				) : (
					<>	         		
						<header>~ Hello {loggedInUser}! ~</header>
						<CardScan
							props={props}
							token={token}
							loggedInUser={loggedInUser}
						/> 
					</>
				)}
			</div>
			<div id="cardscan"></div>
		</>
	);
};

export default Home;