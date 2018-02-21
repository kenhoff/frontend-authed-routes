import React from 'react'
import {Router, Route, Link, Redirect} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

let authState = false;

const userIsAuthenticated = () => {
	return authState;
}
const authenticateUser = () => {
	authState = true;
	window.history.pushState(null, null, "/my-profile")
}

const deauthenticateUser = () => {
	authState = false;
}

let Home = () => {
	return (<div>This is the home page</div>);
}

let Profile = (props) => {
	return (<div><p>
		This is the profile page
	</p>
	<p>
		<button onClick={() => {
				deauthenticateUser()
				props.history.push("/home")
			}}>sign out</button>
	</p></div>);
}

let SignIn = (props) => {
	return (<div>
		<p>
			This is the sign in page
		</p>
		<p>
			<button onClick={() => {
					authenticateUser()
					props.history.push("/my-profile")
				}}>sign in</button>
		</p>
	</div>);
}

let UnauthedRoute = ({
	component: Component,
	...rest
}) => {
	return <Route {...rest} render={(props) => {
			if (userIsAuthenticated()) {
				return (<Redirect to="/my-profile"></Redirect>)
			} else {
				return (<Component {...props}></Component>);
			}
		}}></Route>
}

let AuthedRoute = ({
	component: Component,
	...rest
}) => {
	return <Route {...rest} render={(props) => {
			if (userIsAuthenticated()) {
				return (<Component {...props}></Component>);
			} else {
				return (<Redirect to="/sign-in"></Redirect>)
			}
		}}></Route>
}

class MyRouter extends React.Component {
	render() {
		return (<Router history={createBrowserHistory()}>
			<div>
				<ul>
					<li>
						<Link to="/home">Home</Link>
					</li>
					<li>
						<Link to="/my-profile">My profile (authed)</Link>
					</li>
					<li>
						<Link to="/sign-in">Sign in (unauthed)</Link>
					</li>

				</ul>
				<Route path="/home" component={Home}></Route>
				<AuthedRoute path="/my-profile" component={Profile}></AuthedRoute>
				<UnauthedRoute path="/sign-in" component={SignIn}></UnauthedRoute>
			</div>
		</Router>)
	}
}

export default MyRouter;
