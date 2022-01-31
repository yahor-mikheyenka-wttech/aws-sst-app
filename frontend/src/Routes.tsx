import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NewNote from './containers/NewNote';
import Notes from './containers/Notes';

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/notes/new" component={NewNote}/>
			<Route exact path="/notes/:id" component={Notes}/>
			<Route component={NotFound} />
		</Switch>
	);
};

export default Routes;
