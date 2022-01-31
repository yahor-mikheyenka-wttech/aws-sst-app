import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import AppContext from '../lib/appContext';

const AuthenticatedRoute = (props: any) => {
	const { children, ...rest } = props;
	const { pathname, search } = useLocation();
	const { isAuthenticated } = useContext(AppContext);
	return (
		<Route {...rest}>
			{isAuthenticated ? (
				children
			) : (
				<Redirect to={`/login?redirect=${pathname}${search}`} />
			)}
		</Route>
	);
};

export default AuthenticatedRoute;
