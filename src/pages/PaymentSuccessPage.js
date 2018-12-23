import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { actPaymentSuccess } from '../actions/index';

class PaymentSuccessPage extends Component {
	componentWillUnmount() {
		this.props.onPaymentSuccess(false);
	}

	render() {
		var { paymentSuccess } = this.props;
		// console.log(location);
		// console.log(paymentSuccess);
		if (!paymentSuccess) {
			return (
				<Redirect
					to={
						{
							pathname: '/'
						}
					}
				/> //Redirect được sử dụng trong render
			);
		}
		return (
			<div className="section payment_success">
				<div className="container">
					<h1 className="text-center"><strong className="alert alert-success" role="alert">Thanh toán thành công!</strong></h1>
				</div>
			</div>
		);
	}
}

PaymentSuccessPage.propTypes = {
	paymentSuccess: PropTypes.bool.isRequired,
	onPaymentSuccess: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		paymentSuccess: state.paymentSuccess
	};
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		onPaymentSuccess: (paymentStatus) => {
			dispatch(actPaymentSuccess(paymentStatus));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccessPage);
