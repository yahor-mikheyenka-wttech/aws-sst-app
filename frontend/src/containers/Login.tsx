import { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import './Login.css';
import { Auth } from 'aws-amplify';
import AppContext from '../lib/appContext';
import { useHistory } from 'react-router-dom';
import LoaderButton from './../components/LoaderButton';
import onError from '../lib/onError';
import useFormFields from '../lib/useFormFields';

const Login = () => {
	const history = useHistory();
	const { setIsAuthenticated } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);
	const [fields, setFields] = useFormFields({
		email: '',
		password: ''
	});

	const validateForm = () => {
		const isValid = fields.email.length > 0 && fields.password.length > 0;
		return isValid;
	};

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		setIsLoading(true);
		try {
			await Auth.signIn(fields.email, fields.password);
			setIsAuthenticated(true);
			history.push('/');
		} catch (e) {
			onError(e);
			setIsLoading(false);
		}
	};

	return (
		<div className="Login">
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						autoFocus
						type="email"
						value={fields.email}
						onChange={setFields}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={fields.password}
						onChange={setFields}
					/>
				</Form.Group>
				<LoaderButton
					block
					size="lg"
					type="submit"
					isLoading={isLoading}
					disabled={!validateForm()}
				>
					Login
				</LoaderButton>
			</Form>
		</div>
	);
};

export default Login;
