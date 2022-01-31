import { SamlConsolePrincipal } from 'aws-cdk-lib/aws-iam';
import React, { cloneElement, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppContext from '../lib/appContext';

interface AuthProps {
	exact: boolean;
	path: string;
	component: any;
}

const querystring = (name: string, url = window.location.href) => {
	const parsedName = name.replace(/[[]]/g, '\\$&');
	const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, 'i');
	const results = regex.exec(url);

	if (!results || !results[2]) {
		return false;
	}

	return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const UnauthenticatedRoute = (props: any) => {
	const { children, ...rest } = props;
	const { isAuthenticated } = useContext(AppContext);
	const redirect = querystring('redirect');

	return (
		<Route {...rest}>
			{!isAuthenticated ? (
				children
			) : (
				<Redirect to={redirect ? redirect : '/'} />
			)}
		</Route>
	);
};

export default UnauthenticatedRoute;
