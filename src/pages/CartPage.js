import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import CartItem from '../components/CartItem';
import {	actFetchCartRequest,
					actDeleteProductInCartRequest,
					actUpdateQuantityRequest,
					actPaymentCartRequest } from '../actions/index';

class CartPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			paymentSuccess: false
		};
	}

	componentDidMount() {
		this.props.fetchAllCart();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.paymentSuccess) {
			this.setState({
				paymentSuccess: nextProps.paymentSuccess
			});
		}
	}

	showCartItem = (cart) => {
		var result = (
			<li className="text-center mt-50">
				<p className="mb-15">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
				<p>
					<Link to='/product-list' className="btn btn-primary">Tiếp tục mua sắm</Link>
				</p>
			</li>
		);
		if(cart.length > 0) {
			result = cart.map((item, index) => {
				return (
					<CartItem
						key={index}
						item={item}
						onDeleteProductInCart={this.props.onDeleteProductInCart}
						onUpdateQuantity={this.props.onUpdateQuantity}
					/>
				);
			});
		}
		return result;
	}

	showTotalProduct = (cart) => {
		var total = 0;
		if(cart.length > 0) {
			for (let i = 0; i < cart.length; i++) {
				total += cart[i].quantity
			}
		}
		return total;
	}

	showTotalAmount = (cart) => {
		var total = 0,
				quantity = 0,
				price_original = 0,
				discount = 0,
				price_sale = 0;
		if(cart.length > 0) {
			for (let i = 0; i < cart.length; i++) {
				quantity = cart[i].quantity;
				price_original = cart[i].product.price_original;
				discount = cart[i].product.discount;
				price_sale = parseInt(price_original*(100-discount)/100);
				total += price_sale * quantity;
			}
		}
		return total;
	}

	onPaymentCart = (cart) => {
		this.props.onPaymentCart(cart);
	}

	render() {
		var { cart } = this.props;
		var { paymentSuccess } = this.state;
		// console.log(cart);
		// console.log(location);
		// console.log(paymentSuccess);
		if (paymentSuccess) {
			return (
				<Redirect
					to={
						{
							pathname: '/payment-success'
						}
					}
				/> //Redirect được sử dụng trong render
			);
		}

		return (
			<div className="section con_cart">
				<div className="container">
					<p className="text-right">(===> Nhấn vào <strong>Thanh toán</strong> để Redirect đến trang <strong>Thanh toán thành công</strong>)</p>
					<div className="cart_count mb-15">
						<strong>Giỏ hàng của bạn</strong> <span>(Có {this.showTotalProduct(cart)} sản phẩm)</span>
					</div>
					<div className="cart_main row">
						<div className={cart.length > 0 ? "col-sm-8" : "col-sm-12"}>
							<div className="box_list">
								<ul className="list">
									{this.showCartItem(cart)}
								</ul>
							</div>
						</div>
						<div className={cart.length > 0 ? "col-sm-4" : "col-sm-4 hidden"}>
							<div className="box_total_wrp">
								<div className="box_total mb-15">
									<p className="total_price">
										Tổng tiền:<span className="pull-right">{this.showTotalAmount(cart)}đ</span>
									</p>
									<p className="note text-right">(Giá đã bao gồm VAT)</p>
								</div>
								<div className="box_action">
									<button
										//to='/payment-success'
										type="button"
										className="btn btn-primary btn-lg btn-block"
										onClick = { () => this.onPaymentCart(cart) }
									>
										Thanh toán
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CartPage.propTypes = {
	cart: PropTypes.arrayOf(
		PropTypes.shape({
			// id: PropTypes.number.isRequired,
			quantity: PropTypes.number.isRequired,
			product: PropTypes.shape({
				// id: PropTypes.number.isRequired,
				name: PropTypes.string.isRequired,
				photo: PropTypes.string.isRequired,
				price_original: PropTypes.number.isRequired,
				discount: PropTypes.number.isRequired,
				rating: PropTypes.number.isRequired,
				description: PropTypes.string.isRequired,
				trademark: PropTypes.string.isRequired,
				inventory: PropTypes.number.isRequired
			}).isRequired
		})
	).isRequired,
	paymentSuccess: PropTypes.bool.isRequired,
	fetchAllCart: PropTypes.func.isRequired,
	onDeleteProductInCart: PropTypes.func.isRequired,
	onUpdateQuantity: PropTypes.func.isRequired,
	onPaymentCart: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		cart: state.cart,
		paymentSuccess: state.paymentSuccess
	};
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchAllCart: () => {
			dispatch(actFetchCartRequest());
		},
		onDeleteProductInCart: (item) => {
			dispatch(actDeleteProductInCartRequest(item));
		},
		onUpdateQuantity: (item, quantity) => {
			dispatch(actUpdateQuantityRequest(item, quantity));
		},
		onPaymentCart: (cart) => {
			dispatch(actPaymentCartRequest(cart));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
