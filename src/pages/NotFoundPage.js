import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends Component {
	render() {
		return (
			<div className="container">
				<h1 className="text-center mb-15">404 - Không tìm thấy trang</h1>
				<hr/>
				<p className="text-center">
					<Link to='/' className="btn btn-default">Quay về trang chủ</Link>
				</p>
			</div>
		);
	}
}

export default NotFoundPage;
