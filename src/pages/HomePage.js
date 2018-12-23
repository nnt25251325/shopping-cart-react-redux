import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
	render() {
		return (
			<div className="section">
				<div className="container">
					<h1 className="text-center mb-20"><strong>Mua sắm trực tuyến!</strong></h1>
					<p className="text-center mb-20"><Link to='/product-list' className="btn btn-primary">Bắt đầu mua sắm</Link></p>
					<p className="text-center mb-20">
						<span className="label label-info">#shoppingcart</span>&nbsp;
						<span className="label label-info">#product</span>&nbsp;
						<span className="label label-info">#cart</span>&nbsp;
						<span className="label label-info">#react</span>&nbsp;
						<span className="label label-info">#redux</span>&nbsp;
						<span className="label label-info">#api</span>&nbsp;
						<span className="label label-info">#axios</span>&nbsp;
						<span className="label label-info">#jsonserver</span>&nbsp;
						<span className="label label-info">#mockapidotio</span>
					</p>
					<p className="text-center"><a href="https://github.com/nnt25251325/shopping_cart_react_redux_v1/" target="_blank" rel="noopener noreferrer" className="btn btn-default btn-sm">Tải về</a></p>
				</div>
			</div>
		);
	}
}

export default HomePage;
