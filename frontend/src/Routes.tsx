import { Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NewNote from './containers/NewNote';
import Notes from './containers/Notes';
import Settings from './containers/Settings';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<UnauthenticatedRoute exact path="/login" component={Login} />
			<UnauthenticatedRoute exact path="/signup" component={Signup} />
			<AuthenticatedRoute exact path="/settings" component={Settings} />
			<AuthenticatedRoute exact path="/notes/new" component={NewNote} />
			<AuthenticatedRoute exact path="/notes/:id" component={Notes} />
			<Route component={NotFound} />
		</Switch>
	);
};

export default Routes;
