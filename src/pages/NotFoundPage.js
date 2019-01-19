import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends Component {
	render() {
		return (
			<div className="container">
				<h1 className="text-center invisible mb-15">404 - Không tìm thấy trang</h1>
				<hr className="invisible"/>
				<p className="text-center">
					<Link to='/' className="btn btn-primary btn-lg">VÀO TRANG CHỦ</Link>
				</p>
			</div>
		);
	}
}

export default NotFoundPage;
