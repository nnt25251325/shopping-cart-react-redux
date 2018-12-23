import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CartItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: ''
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			quantity: nextProps.item.quantity
		});
	}

	toSlug = (str) => {
		// Chuyển hết sang chữ thường
		str = str.toLowerCase();
 
		// xóa dấu
		str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
		str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
		str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
		str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
		str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
		str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
		str = str.replace(/(đ)/g, 'd');
 
		// Xóa ký tự đặc biệt
		str = str.replace(/([^0-9a-z-\s])/g, '');
 
		// Xóa khoảng trắng thay bằng ký tự -
		str = str.replace(/(\s+)/g, '-');
 
		// xóa phần dự - ở đầu
		str = str.replace(/^-+/g, '');
 
		// xóa phần dư - ở cuối
		str = str.replace(/-+$/g, '');
 
		// return
		return str;
	}

	showPrice = (price_original, discount) => {
		if(discount > 0) {
			return (
				<p className="product_price mb-0">
					<strong className="price_sale">{parseInt(price_original*(100-discount)/100)}đ</strong><br/>
					<strike className="price_original"><small>{price_original}đ</small></strike>&nbsp;
					<span className="discount label label-danger">-{discount}%</span>
				</p>
			);
		} else {
			return (
				<p className="product_price">
					<strong className="price_sale">{parseInt(price_original*(100-discount)/100)}đ</strong><br/>
				</p>
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

	onDeleteProductInCart = (item) => {
		// Thêm dòng comment >>>eslint-disable-line<<< ngay trên dòng có hàm confirm để chạy được hàm này
		if(confirm('Bạn chắc chắn muốn xóa?')) { //eslint-disable-line
			this.props.onDeleteProductInCart(item);
		}
	}

	onUpdateQuantity = (item, quantity) => {
		if(quantity > 0 && quantity <= this.props.item.product.inventory) {
			this.props.onUpdateQuantity(item, quantity);
		}
	}

	onChangeInputQuantity = (e) => {
		var { item } = this.props;
		if(parseInt(e.target.value) === 0 || e.target.value === '' || e.target.value !== e.target.value.replace(/\D/,'')) {
			this.setState({
				quantity: 1
			});
		} else if(parseInt(e.target.value) >= item.product.inventory) {
			alert(`Số lượng hàng trong kho còn ${item.product.inventory} sản phẩm. Chúng tôi sẽ cập nhật sớm!`);
			this.setState({
				quantity: item.product.inventory
			});
		} else {
			this.setState({
				quantity: parseInt(e.target.value.replace(/\D/,''))
			});
		}
	}

	onBlurInputQuantity = (e) => {
		if(this.state.quantity !== this.props.item.quantity) {
			this.props.onUpdateQuantity(this.props.item, this.state.quantity);
		}
	}

	onFocusInputQuantity = (e) => {
		e.target.setSelectionRange(0, e.target.value.length);
		e.target.addEventListener('keyup', function(e) {
			if(e.keyCode === 13 || e.which === 13) this.blur();
		});
	}

	render() {
		var { item } = this.props;
		var toSlugName = this.toSlug(item.product.name);
		// console.log(item);
		// console.log(this.state.quantity);

		return (
			<li className="product_item">
				<div className="row">
					<div className="col-sm-2 col_thumb pr-0">
						<Link to={`/product-detail/${toSlugName}.${item.product.id}`} className="product_thumb over">
							<img src={item.product.photo} alt={item.product.name} />
						</Link>
					</div>
					<div className="col-sm-7 col_desc">
						<p className="product_title mb-5">
							<Link to={`/product-detail/${toSlugName}.${item.product.id}`}>
								{item.product.name}
							</Link>
						</p>
						{this.showPrice(item.product.price_original, item.product.discount)}
					</div>
					<div className="col-sm-3 col_quantity text-right">
						<div className="product_quantity">
							<div className="btn-group" role="group">
								<button
									type="button"
									className="btn btn-default"
									disabled={this.state.quantity <= 1}
									onClick= { () => this.onUpdateQuantity(item, this.state.quantity - 1) }
								>
									<i className="fa fa-minus"></i>
								</button>
								<input
										type="text"
										className="btn btn-default input_quantity"
										value={this.state.quantity}
										onChange={ this.onChangeInputQuantity }
										onBlur={ this.onBlurInputQuantity }
										onFocus={ this.onFocusInputQuantity }
									/>
								<button
									type="button"
									className="btn btn-default"
									disabled={this.state.quantity >= item.product.inventory}
									onClick= { () => this.onUpdateQuantity(item, this.state.quantity + 1) }
								>
									<i className="fa fa-plus"></i>
								</button>
							</div>
							<div className="inventory mt-5"><small>(Còn {item.product.inventory} sản phẩm trong kho)</small></div>
						</div>
					</div>
				</div>
				<button
					type="button"
					className="btn_delete"
					data-toggle="tooltip"
					data-placement="left"
					data-original-title="Xóa sản phẩm"
					onClick = { () => this.onDeleteProductInCart(item) }
				>
					<i className="fa fa-trash"></i>
				</button>
			</li>
		);
	}
}

export default CartItem;
