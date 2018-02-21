import React from 'react'
import {BrowserRouter, Router, Route, Link, Redirect} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory'

let authState = false;

const userIsAuthenticated = () => {
    return authState;
}
const authenticateUser = () => {
    authState = true;
    window
        .history
        .pushState(null, null, "/my-settings")
}

const deauthenticateUser = () => {
    authState = false;
}

let Home = () => {
    return (<div>This is the home page</div>);
}

let Pricing = () => {
    return (<div>This is the pricing page</div>);
}

let About = () => {
    return (<div>This is the about page</div>);
}

let Settings = (props) => {
    return (<div>
        <p>
            This is the settings page
        </p>
        <p>
            <button onClick={() => {
                    deauthenticateUser()
                    props
                        .history
                        .push("/home")
                }}>sign out</button>
        </p>
    </div>);
}

let SignIn = (props) => {
    return (<div>
        <p>
            This is the sign in page
        </p>
        <p>
            <button onClick={() => {
                    authenticateUser()
                    props
                        .history
                        .push("/my-settings")
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
                return (<Redirect to="/my-settings"></Redirect>)
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

let basename = (
    process.env.NODE_ENV === "development"
    ? null
    : "/frontend-authed-routes") // for github pages ;)

class MyRouter extends React.Component {
    render() {
        return (<BrowserRouter basename={basename}>
            <div>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/pricing">Pricing</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/my-settings">My settings (authed)</Link>
                    </li>
                    <li>
                        <Link to="/sign-in">Sign in (unauthed)</Link>
                    </li>
                </ul>
                <Route path="/home" component={Home}></Route>
                <Route path="/pricing" component={Pricing}></Route>
                <Route path="/about" component={About}></Route>
                <AuthedRoute path="/my-settings" component={Settings}></AuthedRoute>
                <UnauthedRoute path="/sign-in" component={SignIn}></UnauthedRoute>
            </div>
        </BrowserRouter>)
    }
}
export default MyRouter;
