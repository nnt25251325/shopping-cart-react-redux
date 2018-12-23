import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import Header from './components/Header';

class App extends Component {
	render() {
		return (
			<Router>
				<Fragment>
					<Header />
					{ this.showContentMenus(routes) }
				</Fragment>
			</Router>
		);
	}

	showContentMenus = (routes) => {
		var result = null;
		if(routes.length > 0) {
			result = routes.map((route, index)=>{
				return (
					<Route
						key={index}
						path={route.path}
						exact={route.exact}
						component={route.main}
					/>
				);
			});
		}
		return <Switch>{result}</Switch>;
	}
}

export default App;
