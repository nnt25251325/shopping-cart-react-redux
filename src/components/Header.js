import React, { Component, Fragment } from 'react';
import Menu from '../components/Menu';
import CartDropdown from '../containers/CartDropdown';

class Header extends Component {
	render() {
		return (
			<Fragment>
				<div id="api_loading"><i className="ic_loading fa fa-refresh fa-spin" aria-hidden="true"></i></div>
				<div id="hd_mainnav" className="hd_mainnav">
					<nav className="navbar navbar-default" role="navigation">
						<div className="container">
							<Menu />
							<CartDropdown />
						</div>
					</nav>
				</div>
			</Fragment>
		);
	}
}

export default Header;
