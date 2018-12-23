import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CartDropdownItem extends Component {
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
				<p className="product_price">
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

	onDeleteProductInCart = (id) => {
		//Thêm dòng comment >>>eslint-disable-line<<< ngay trên dòng có hàm confirm để chạy được hàm này
		if(confirm('Bạn chắc chắn muốn xóa?')) { //eslint-disable-line
			this.props.onDeleteProductInCart(id);
		}
	}

	render() {
		var { item } = this.props;
		var toSlugName = this.toSlug(item.product.name);
		// console.log(item);

		return (
			<li className="product_item">
				<div className="row">
					<div className="col-sm-3 pr-0">
						<Link to={`/product-detail/${toSlugName}.${item.product.id}`}
							className="product_thumb over"
							onClick={ () => { document.getElementById('dropdown_carts').classList.remove('open') } }
						>
							<img src={item.product.photo} alt={item.product.name} />
						</Link>
					</div>
					<div className="col-sm-9">
						<p className="product_title">
							<Link
								to={`/product-detail/${toSlugName}.${item.product.id}`}
								onClick={ () => { document.getElementById('dropdown_carts').classList.remove('open') } }
							>
								{item.product.name}
							</Link>
						</p>
						{this.showPrice(item.product.price_original, item.product.discount)}
					</div>
				</div>
				<div className="product_quantity">x{item.quantity}</div>
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

export default CartDropdownItem;
