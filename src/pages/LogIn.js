import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LogIn = props => {
	const [token, setToken] = useState('');
	const [user, setUser] = useState({
		username: '',
		password: ''
	});
	const [loggedInUser, setLoggedInUser] = useState('');
	const [toggle, setToggle] = useState(false);
	const [showForm, setShowForm] = useState(true);

	useEffect(() => {
		if (window.localStorage.getItem('token')) {
			setToken(window.localStorage.getItem('token'));
			setLoggedInUser(window.localStorage.getItem('loggedInUser'));
		}
	}, []);

	const handleChange = e => {
		setUser({ ...user, [e.target.id]: e.target.value });
	};

	const handleLogin = async e => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:3000/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			const data = await response.json();
			setToken(data.token);
			setLoggedInUser(data.user.username);
			window.localStorage.setItem('token', data.token);
			window.localStorage.setItem('loggedInUser', data.user.username);
		} catch (error) {
			console.error(error);
			alert('Username / password invalid');		
		} 
	};

	const handleRegister = async e => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3000/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			const data = await response.json();
			setToken(data.token);
			setLoggedInUser(data.user.username);
			window.localStorage.setItem('token', data.token);
			window.localStorage.setItem('loggedInUser', data.user.username);
	
			setToggle(!toggle);
			displayForm();
		} catch (error) {
			console.error(error);
			alert('Username already taken');
		} 
	};

	const displayForm = () => {
		setShowForm(!showForm);
	};

	const logout = () => {
		window.localStorage.clear();
	};

	return (
		<div className="LogIn">
			<div className="logInPage">
				{showForm && (
					<>
						{!token ? (
							<>
								<form className="loginForm" onSubmit={handleLogin}>
									<input
										type="text"
										id="username"
										value={user.username}
										placeholder="username"
										onChange={handleChange}
									/>
									<input
										type="text"
										id="password"
										value={user.password}
										placeholder="password"
										onChange={handleChange}
									/>
									<input
										className="logInBut btn btn-primary"
										type="submit"
										value="Log In"
									/>
									<div className="addLine"></div>
								</form>

								<button
									className="regBut btn btn-success"
									onClick={() => {
										setToggle(!toggle);
										displayForm();
									}}
								>
									Create New Account
								</button>
							</>
						) : (
							<>
								<div>Hello, {loggedInUser}! You are logged in.</div>
								<Link to="/">
									<button className="logOutBut btn btn-danger" onClick={logout}>
										Log Out
									</button>
								</Link>
							</>
						)}
					</>
				)}

				{toggle && (
					<form className="regForm" onSubmit={handleRegister}>
						<p>Create New Account</p>
						<input
							type="text"
							id="username"
							value={user.username}
							placeholder="username"
							onChange={handleChange}
						/>
						<input
							type="password"
							id="password"
							value={user.password}
							placeholder="password"
							onChange={handleChange}
						/>
						<input
							className="submitBut  btn btn-primary"
							type="submit"
							value="Submit"
						/>
					</form>
				)}
			</div>
		</div>
	);
};

export default LogIn;