import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import Routes from './Routes';
import { AppContext } from './lib/appContext';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import onError from './lib/onError';

const App = () => {
	const history = useHistory();

	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		onLoad();
	}, []);

	const onLoad = async () => {
		try {
			await Auth.currentSession();
			setIsAuthenticated(true);
		} catch (e) {
			if (e !== 'No current user') {
				onError(e);
			}
		}

		setIsAuthenticating(false);
	};

	const handleLogout = async () => {
		await Auth.signOut();
		setIsAuthenticated(false);
		history.push('/login');
	};

	return (
		<>
			{!isAuthenticating && (
				<div className="App container py-3">
					<Navbar
						collapseOnSelect
						bg="light"
						expand="md"
						className="mb-3"
					>
						<LinkContainer to="/">
							<Navbar.Brand className="font-weight-bold text-muted">
								Scratch
							</Navbar.Brand>
						</LinkContainer>
						<Navbar.Toggle />
						<Navbar.Collapse className="justify-content-end">
							<Nav activeKey={window.location.pathname}>
								{isAuthenticated ? (
									<>
										<LinkContainer to="/settings">
											<Nav.Link>Settings</Nav.Link>
										</LinkContainer>
										<Nav.Link onClick={handleLogout}>
											Logout
										</Nav.Link>
									</>
								) : (
									<>
										<LinkContainer to="/signup">
											<Nav.Link>Signup</Nav.Link>
										</LinkContainer>
										<LinkContainer to="/login">
											<Nav.Link>Login</Nav.Link>
										</LinkContainer>
									</>
								)}
							</Nav>
						</Navbar.Collapse>
					</Navbar>
					<AppContext.Provider
						value={{ isAuthenticated, setIsAuthenticated }}
					>
						<Routes />
					</AppContext.Provider>
				</div>
			)}
		</>
	);
};

export default App;
