import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import onError from '../lib/onError';
import config from '../config';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import BillingForm from '../components/BillingForm';
import './Settings.css';

interface FormProps {
	token: Token;
	error: string;
}

interface Token {
	id: string;
}

const Settings = () => {
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);
	const stripePromise = loadStripe(config.STRIPE_KEY);

	function billUser(details: any) {
		return API.post('notes', '/billing', {
			body: details
		});
	}

	const handleFormSubmit = async (
		storage: any,
		{ token, error }: FormProps
	): Promise<void> => {
		if (error) {
			onError(error);
			return;
		}

		setIsLoading(true);

		try {
			await billUser({
				storage,
				source: token.id
			});

			alert('Your card has been charged successfully!');
			history.push('/');
		} catch (e) {
			onError(e);
			setIsLoading(false);
		}
	};

	return (
		<div className="Settings">
			<Elements stripe={stripePromise}>
				<BillingForm
					isLoading={isLoading}
					onSubmit={handleFormSubmit}
				/>
			</Elements>
		</div>
	);
};

export default Settings;
