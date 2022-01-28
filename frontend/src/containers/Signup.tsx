import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import { AppContext } from '../lib/appContext';
import useFormFields from '../lib/useFormFields';
import onError from '../lib/onError';
import { Auth } from 'aws-amplify';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import './Signup.css';

const Signup = () => {
	const [fields, handleFieldChange] = useFormFields({
		email: '',
		password: '',
		confirmPassword: '',
		confirmationCode: ''
	});
	const history = useHistory();
	const [newUser, setNewUser] = useState<ISignUpResult | null>(null);
	const { setIsAuthenticated } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);

	const validateForm = () => {
		return (
			fields.email.length > 0 &&
			fields.password.length > 0 &&
			fields.password === fields.confirmPassword
		);
	};

	const validateConfirmationForm = () => {
		return fields.confirmationCode.length > 0;
	};

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		setIsLoading(true);

		try {
			const newUser = await Auth.signUp({
				username: fields.email,
				password: fields.password
			});
			setIsLoading(false);
			setNewUser(newUser);
		} catch (e) {
			onError(e);
			setIsLoading(false);
		}
	};

	const handleConfirmationSubmit = async (event: {
		preventDefault: () => void;
	}) => {
		event.preventDefault();

		setIsLoading(true);

		try {
			await Auth.confirmSignUp(fields.email, fields.confirmationCode);
			await Auth.signIn(fields.email, fields.password);

			setIsAuthenticated(true);
			history.push('/');
		} catch (e) {
			onError(e);
			setIsLoading(false);
		}
	};

	const renderConfirmationForm = () => {
		return (
			<Form onSubmit={handleConfirmationSubmit}>
				<Form.Group controlId="confirmationCode">
					<Form.Label>Confirmation Code</Form.Label>
					<Form.Control
						autoFocus
						type="tel"
						onChange={handleFieldChange}
						value={fields.confirmationCode}
					/>
					<Form.Text muted>
						Please check your email for the code.
					</Form.Text>
				</Form.Group>
				<LoaderButton
					block
					size="lg"
					type="submit"
					variant="success"
					isLoading={isLoading}
					disabled={!validateConfirmationForm()}
				>
					Verify
				</LoaderButton>
			</Form>
		);
	};

	const renderForm = () => {
		return (
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						autoFocus
						type="email"
						value={fields.email}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={fields.password}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group controlId="confirmPassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						onChange={handleFieldChange}
						value={fields.confirmPassword}
					/>
				</Form.Group>
				<LoaderButton
					block
					size="lg"
					type="submit"
					variant="success"
					isLoading={isLoading}
					disabled={!validateForm()}
				>
					Signup
				</LoaderButton>
			</Form>
		);
	};

	return (
		<div className="Signup">
			{newUser === null ? renderForm() : renderConfirmationForm()}
		</div>
	);
};

export default Signup;
