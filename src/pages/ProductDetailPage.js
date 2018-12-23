import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import callApi from '../utils/apiCaller';
import {	actAddToCartRequest,
					actUpdateProduct	} from '../actions/index';

class ProductDetailPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product: {
				id: '',
				name: '',
				photo: '',
				price_original: '',
				discount: '',
				rating: '',
				description: '',
				trademark: '',
				inventory: ''
			},
			quantity: 1
		};
	}

	componentDidMount() {
		var { match } = this.props;
		// console.log(match);
		if(match) {
			var id = parseInt(match.params.id);
			callApi(`shopping_cart_01_products/${id}`, 'GET', null).then((res) => {
				if (res) {
					this.setState({
						product: {
							id: res.data.id,
							name: res.data.name,
							photo: res.data.photo,
							price_original: res.data.price_original,
							discount: res.data.discount,
							rating: res.data.rating,
							description: res.data.description,
							trademark: res.data.trademark,
							inventory: res.data.inventory
						}
					});
					res.data.count_view += 1;
					callApi(`shopping_cart_01_products/${res.data.id}`, 'PUT', res.data).then((res2) => {
						actUpdateProduct(res2.data);
						console.log(`${res2.data.name} => đã cập nhật count_view thành: ${res2.data.count_view}`);
					});
				}
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		var { match } = nextProps;
		// console.log(match);
		if(match) {
			var id = parseInt(match.params.id);
			callApi(`shopping_cart_01_products/${id}`, 'GET', null).then((res) => {
				if (res) {
					this.setState({
						product: {
							id: res.data.id,
							name: res.data.name,
							photo: res.data.photo,
							price_original: res.data.price_original,
							discount: res.data.discount,
							rating: res.data.rating,
							description: res.data.description,
							trademark: res.data.trademark,
							inventory: res.data.inventory
						}
					});
					res.data.count_view += 1;
					callApi(`shopping_cart_01_products/${res.data.id}`, 'PUT', res.data).then((res2) => {
						actUpdateProduct(res2.data);
						console.log(`${res2.data.name} => đã cập nhật count_view thành: ${res2.data.count_view}`);
					});
				}
			});
		}
	}

	showPrice = (original, discount) => {
		if(discount > 0) {
			return (
				<p className="product_price">
					<strong className="price_sale">{parseInt(original*(100-discount)/100)}đ</strong>&nbsp;
					<strike className="price_original"><small>{original}đ</small></strike>&nbsp;
					<span className="discount label label-danger">-{discount}%</span>
				</p>
			);
		} else {
			return (
				<p className="product_price">
					<strong className="price_sale">{parseInt(original*(100-discount)/100)}đ</strong>&nbsp;
				</p>
			);
		}
	}

	showRating = (rating) => {
		var result = [];
		for (var i = 1; i <= rating; i++) {
			result.push(<li key={i}><i className="fa fa-star active"></i></li>)
		}
		for (var j = 1; j <= (5-rating); j++) {
			result.push(<li key={i+j}><i className="fa fa-star"></i></li>)
		}
		return (
			<div className="product_rating mb-10">
				<ul>
					{result}
				</ul>
				<span>({rating})</span>
			</div>
		);
	}

	showSoldout = (inventory) => {
		if(inventory === 0) {
			return (
				<div className="product_soldout alert alert-danger text-center">Hết hàng</div>
			);
		}
	}

	onChangeQuantity = (quantity) => {
		if(quantity > 0 && quantity <= this.state.product.inventory) {
			this.setState({
				quantity: quantity
			});
		}
	}

	onChangeInputQuantity = (e) => {
		var { product } = this.state;
		if(parseInt(e.target.value) === 0 || e.target.value === '' || e.target.value !== e.target.value.replace(/\D/,'')) {
			this.setState({
				quantity: 1
			});
		} else if(parseInt(e.target.value) >= product.inventory) {
			alert(`Số lượng hàng trong kho còn ${product.inventory} sản phẩm. Chúng tôi sẽ cập nhật sớm!`);
			this.setState({
				quantity: product.inventory
			});
		} else {
			this.setState({
				quantity: parseInt(e.target.value.replace(/\D/,''))
			});
		}
	}

	onFocusInputQuantity = (e) => {
		e.target.setSelectionRange(0, e.target.value.length);
		e.target.addEventListener('keyup', function(e) {
			if(e.keyCode === 13 || e.which === 13) this.blur();
		});
	}

	onAddToCart = (product, quantity) => {
		this.props.onAddToCart(product, quantity);
	}

	render() {
		var { product, quantity } = this.state;
		// console.log(quantity);

		return (
			<div className="section product_detail">
				<div className="container">
					<div className="product_item">
						<div className="row">
							<div className="col-sm-5 text-center">
								<img src={product.photo} alt={product.name} />
							</div>
							<div className="col-sm-7">
								{this.showSoldout(product.inventory)}
								<h3 className="product_title mb-15">{product.name}</h3>
								{this.showRating(product.rating)}
								<p className="product_trademark">Thương hiệu: <span>{product.trademark}</span></p>
								{this.showPrice(product.price_original, product.discount)}
								<div className="product_description mb-10">
									<pre>
										{product.description}
									</pre>
								</div>
								<hr/>
								<div className="product_quantity mb-20">
									<span className="title_quantity">Số lượng:</span>
									<div className="btn-group" role="group">
										<button
											type="button"
											className="btn btn-default"
											disabled={quantity <= 1}
											onClick= { () => this.onChangeQuantity(this.state.quantity - 1) }
										>
											<i className="fa fa-minus"></i>
										</button>
										<input
											type="text"
											className="btn btn-default input_quantity"
											value={this.state.quantity}
											onChange={ this.onChangeInputQuantity }
											onFocus={ this.onFocusInputQuantity }
										/>
										<button
											type="button"
											className="btn btn-default"
											disabled={quantity >= product.inventory}
											onClick= { () => this.onChangeQuantity(this.state.quantity + 1) }
										>
											<i className="fa fa-plus"></i>
										</button>
									</div>
									<span className="inventory">(Còn {product.inventory ? product.inventory : 0} sản phẩm)</span>
								</div>
								<div className="product_addtocart">
									<button
										type="button"
										className="btn btn-primary"
										disabled={!product.inventory}
										onClick={ () => this.onAddToCart(product, quantity) }
									>
										Thêm vào giỏ hàng
									</button>
								</div>
							</div>
						</div>
					</div>
					<hr/>
					<p className="text-center mb-15">
						<Link to='/product-list' className="btn btn-default">Quay lại danh sách</Link>
					</p>
				</div>
			</div>
		);
	}
}

ProductDetailPage.propTypes = {
	onAddToCart: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		onAddToCart: (product, quantity) => {
			dispatch(actAddToCartRequest(product, quantity));
		}
	};
};

export default connect(null, mapDispatchToProps)(ProductDetailPage);
