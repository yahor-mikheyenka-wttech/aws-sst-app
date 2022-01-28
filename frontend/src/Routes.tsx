import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Signup from './containers/Signup';

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/signup" component={Signup} />
			<Route component={NotFound} />
		</Switch>
	);
};

export default Routes;
