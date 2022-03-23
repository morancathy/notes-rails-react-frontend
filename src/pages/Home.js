import React, {useState, useEffect} from 'react';
import CardScan from '../components/CardScan';

const Home = (props) => {
	const [token, setToken] = useState('');
	const [user, setUser] = useState({
		username: '',
		password: ''
	});
	const [loggedInUser, setLoggedInUser] = useState('');

    useEffect(() => {
		if (window.localStorage.getItem('token')) {
			setToken(window.localStorage.getItem('token'));
			setLoggedInUser(window.localStorage.getItem('loggedInUser'));
		}
	}, []);
    
    
	return (
		<div>
			{!token ? (
					<h1>Please Login</h1>
			) : (
				<>
          <h1>Hello {loggedInUser}!</h1>
					<CardScan
            token={token}
            setToken={setToken}
            user={user}
            setUser={setUser}
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          /> 
				</>
			)};
		</div>
	);
};

export default Home;