import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartDropdownItem from '../components/CartDropdownItem';
import {	actFetchCartRequest,
					actDeleteProductInCartRequest } from '../actions/index';

class CartDropdown extends Component {
	componentDidMount() {
		this.props.fetchAllCart();
	}

	showCartItem = (cart) => {
		var result = (
			<li className="text-center">
				<p style={{paddingTop: 20, paddingBottom: 20}}>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
			</li>
		);
		if(cart.length > 0) {
			result = cart.map((item, index) => {
				return 	<CartDropdownItem
									key={index}
									item={item}
									product={item.product}
									quantity={item.quantity}
									onDeleteProductInCart={this.props.onDeleteProductInCart}
								/>
			});
		}
		return result;
	}

	showTotalProduct = (cart) => {
		var total = 0;
		if(cart.length > 0) {
			for (var i = 0; i < cart.length; i++) {
				total += cart[i].quantity
			}
		}
		return total;
	}

	showBoxAmount = (cart) => {
		var result = null,
				total = 0,
				quantity = 0,
				price_original = 0,
				discount = 0,
				price_sale = 0;
		if(cart.length > 0) {
			for (var i = 0; i < cart.length; i++) {
				quantity = cart[i].quantity;
				price_original = cart[i].product.price_original;
				discount = cart[i].product.discount;
				price_sale = parseInt(price_original*(100-discount)/100);
				total += price_sale * quantity;
			}
			result = (
				<div className="box_total mb-15">
					Tổng tiền:
					<span className="pull-right">{total}đ</span>
				</div>
			);
		}
		return result;
	}

	render() {
		var { cart } = this.props;
		// console.log(cart);

		return (
			<div className="dropdown dropdown_carts" id="dropdown_carts">
				<button className="btn_dropdown" type="button">
					<i className="ic_btn fa fa-shopping-cart"></i>
					<span className="num">{this.showTotalProduct(cart)}</span>
				</button>
				<div className="dropdown-menu pull-right">
					<div className="box_list">
						<ul className="list">
							{this.showCartItem(cart)}
						</ul>
					</div>
					{this.showBoxAmount(cart)}
					<div className="box_action">
						<Link
							to='/cart'
							className="btn btn-primary btn-block"
							onClick={ () => { document.getElementById('dropdown_carts').classList.remove('open') } }
						>
							Xem giỏ hàng
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

CartDropdown.propTypes = {
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
	fetchAllCart: PropTypes.func.isRequired,
	onDeleteProductInCart: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		cart: state.cart
	};
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchAllCart: () => {
			dispatch(actFetchCartRequest());
		},
		onDeleteProductInCart: (item) => {
			dispatch(actDeleteProductInCartRequest(item));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
