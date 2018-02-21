import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

class MyRouter extends React.Component {
	render() {
		return (<App></App>)
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
