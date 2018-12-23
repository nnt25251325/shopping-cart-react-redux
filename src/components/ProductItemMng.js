import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductItemMng extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowMoreDesc: false
		};
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

	onDelete = (product) => {
		//Thêm dòng comment >>>eslint-disable-line<<< ngay trên dòng có hàm confirm để chạy được hàm này
		if(confirm('Bạn chắc chắn muốn xóa?')) { //eslint-disable-line
			this.props.onDelete(product);
		}
	}

	showDiscount = (discount) => {
		if(discount > 0) {
			return ("-" + discount + "%");
		} else {
			return (
				<span className="alert alert-info mb-0" role="alert">Không giảm giá</span>
			);
		}
	}

	showInventory = (inventory) => {
		if(inventory === 0) {
			return (
				<span className="alert alert-danger mb-0" role="alert">Hết hàng</span>
			);
		} else {
			return inventory;
		}
	}

	shortenParagraph = (str, maxLength = 50, separator = " ") => {
		return (str.length <= maxLength) ? str : str.substr(0, str.lastIndexOf(separator, maxLength)) + "...";
	}

	onShowMoreDescription = (description) => {
		if (description === '') {
			return (
				<td className="col_description text-center">
					<span className="alert alert-info mb-0" role="alert">Chưa có mô tả</span>
				</td>
			);
		} else {
			return (
				<td className="col_description">
					{ this.state.isShowMoreDesc ? description : this.shortenParagraph(description, 60, " ") }
					<button onClick={ () => this.setState({ isShowMoreDesc: !this.state.isShowMoreDesc }) } className="btn_readmore">
						{ this.state.isShowMoreDesc ? 'Thu gọn' : 'Xem thêm' }
					</button>
				</td>
			);
		}
	}

	render() {
		var { product, index } = this.props;
		var toSlugName = this.toSlug(product.name);
		// console.log(product);

		return (
			<tr>
				<td className="col_order text-center">{index + 1}</td>
				<td className="col_photo text-center">
					<Link to={`/product-detail/${toSlugName}.${product.id}`} className="over">
						<img src={product.photo} alt={product.name} width="80" />
					</Link>
				</td>
				<td className="col_name">
					<Link to={`/product-detail/${toSlugName}.${product.id}`} className="product_title">
						{product.name}
					</Link>
				</td>
				<td className="col_price_org text-center">
					{product.price_original}đ
				</td>
				<td className="col_discount text-center ws_nowrap">
					{this.showDiscount(product.discount)}
				</td>
				<td className="col_price_sale text-center">
					{parseInt(product.price_original*(100-product.discount)/100)}đ
				</td>
				<td className="col_rating text-center">
					{product.rating}
				</td>
				{this.onShowMoreDescription(product.description)}
				<td className="col_trademark text-center">
					{product.trademark}
				</td>
				<td className="col_inventory text-center ws_nowrap">
					{this.showInventory(product.inventory)}
				</td>
				<td className="col_count_view text-center ws_nowrap">
					{product.count_view}
				</td>
				<td className="col_action text-center">
					<Link to={`/product-mng/${product.id}/edit`} className="btn btn-success">
						<i className="fa fa-pencil mr-5"></i>Sửa
					</Link>&nbsp;
					<button
						type="button"
						className="btn btn-danger"
						onClick={ () => this.onDelete(product) }
					>
						<i className="fa fa-trash mr-5"></i>Xóa
					</button>
				</td>
			</tr>
		);
	}
}

export default ProductItemMng;
