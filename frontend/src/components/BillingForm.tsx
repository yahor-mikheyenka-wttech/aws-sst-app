import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoaderButton from './LoaderButton';
import useFormFields from '../lib/useFormFields';
import './BillingForm.css';

interface BillingFormProps {
	isLoading: boolean;
	onSubmit: any;
}

const BillingForm = ({ isLoading = false, onSubmit }: BillingFormProps) => {
	const stripe = useStripe();
	const elements = useElements();
	const [fields, handleFieldChange] = useFormFields({
		name: '',
		storage: ''
	});
	const [isProcessing, setIsProcessing] = useState(false);
	const [isCardComplete, setIsCardComplete] = useState(false);

	isLoading = isProcessing || isLoading;

	const validateForm = () => {
		return (
			stripe &&
			elements &&
			fields.name !== '' &&
			fields.storage !== '' &&
			isCardComplete
		);
	};

	const handleSubmitClick = async (event: any) => {
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}

		setIsProcessing(true);

		const cardElement: any = elements.getElement(CardElement);

		const { token, error } = await stripe.createToken(cardElement);

		setIsProcessing(false);

		onSubmit(fields.storage, { token, error });
	};

	return (
		<Form className="BillingForm" onSubmit={handleSubmitClick}>
			<Form.Group controlId="storage">
				<Form.Label>Storage</Form.Label>
				<Form.Control
					min="0"
					type="number"
					value={fields.storage}
					onChange={handleFieldChange}
					placeholder="Number of notes to store"
				/>
			</Form.Group>
			<hr />
			<Form.Group controlId="name">
				<Form.Label>Cardholder&apos;s name</Form.Label>
				<Form.Control
					type="text"
					value={fields.name}
					onChange={handleFieldChange}
					placeholder="Name on the card"
				/>
			</Form.Group>
			<Form.Label>Credit Card Info</Form.Label>
			<CardElement
				className="card-field"
				onChange={(e) => setIsCardComplete(e.complete)}
				options={{
					style: {
						base: {
							fontSize: '16px',
							color: '#495057',
							fontFamily: "'Open Sans', sans-serif"
						}
					}
				}}
			/>
			<LoaderButton
				block
				size="lg"
				type="submit"
				isLoading={isLoading}
				disabled={!validateForm()}
			>
				Purchase
			</LoaderButton>
		</Form>
	);
};

export default BillingForm;
