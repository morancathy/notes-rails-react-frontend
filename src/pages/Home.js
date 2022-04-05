import React, {useState, useEffect} from 'react';
import CardScan from '../components/CardScan';

const Home = () => {
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