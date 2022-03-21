import React, { useState } from 'react';

const LogIn = props => {
	const [token, setToken] = useState('');
	const [user, setUser] = useState({
		username: '',
		password: ''
	});
	const [loggedInUser, setLoggedInUser] = useState('');
	const [toggle, setToggle] = useState(false);
	const [showForm, setShowForm] = useState(true);

	const handleChange = e => {
		setUser({ ...user, [e.target.id]: e.target.value });
	};

	const handleLogin = async e => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:3000/users`, {
				// credentials: 'include',
				method: 'POST',
				// mode: 'no-cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
			console.log("user: ", user)
			console.log("response: ", response)
			const data = await response.json();
			
			console.log("data: ", data)

			setToken(data.token);
			setLoggedInUser(data.user.username);
			window.localStorage.setItem('token', data.token);
			window.localStorage.setItem('loggedInUser', data.user.username);
		} catch (error) {
			console.error(error);
			alert('Username / password invalid');
		} 
		// finally {
		// 	window.location.assign('/login');
		// }
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
		// } finally {
		// 	window.location.assign('/login');
		// }
	};

	const displayForm = () => {
		setShowForm(!showForm);
	};

	const logout = () => {
		window.localStorage.clear();
		window.localStorage.assign('/');
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
								<button className="logOutBut btn btn-danger" onClick={logout}>
									Log Out
								</button>
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















// import React from 'react';
// import { useParams } from 'react-router-dom';
// import {useAppState} from '../AppState.jsx';

// const Auth = (props) => {
//     const type = useParams().form;
//     const [formData, setFormData] = React.useState({
//         username: "",
//         password: ""
//     });
//     const [userData, setUserData] = React.useState(null);
//     const {state, dispatch} = useAppState();

//     React.useEffect(() => {
//         if (userData) {
//             console.log(userData)
//             const {token, user} = userData;
//             dispatch ({type: "auth", payload: {token, username: user.username}})
//         }
//     }, [userData]);

//     const actions = {
//         signup: () => {
//             return fetch(state.url + "/users", {
//                 method: "post",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             }).then((response) => response.json());
//         },
//         login: () => {
//             return fetch(state.url + "/login", {
//                 method: "post",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             }).then((response) => response.json());
//         },
//     }

//     const handleChange = (e) => {
//         setFormData({...formData, [e.target.name] : e.target.value})
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         actions[type]().then((data) => {
//             setUserData(data)
//         })
//     };
    
//     return (
//         <>
//             <h1>{type}</h1>
//             <div>
//                 <form onSubmit={handleSubmit}> 
//                     <input type="text" name="username" value={formData.username} onChange={handleChange} />
//                     <input type="password" name="password" value={formData.password} onChange={handleChange}/>
//                     <input type="submit" value={type} />
//                 </form>
//             </div>
//         </>
//     )
// };

// export default Auth;