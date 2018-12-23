import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductItemMng from '../components/ProductItemMng';
import ProductSearchControl from '../components/ProductSearchControl';
import Pagination from '../components/Pagination';
import {	actFetchProductsRequest,
					actSearchProduct,
					actDeleteProductRequest } from '../actions/index';

class ProductListMngPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			totalRecords: '',
			totalPages: '',
			pageLimit: '',
			currentPage: '',
			startIndex: '',
			endIndex: ''
		};
	}

	componentDidMount() {
		this.props.fetchAllProducts();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			totalRecords: nextProps.products.length
		});
	}

	showProducts = (products) => {
		var result = null;
		if(products.length > 0) {
			result = products.map((product, index) => {
				return (
					<ProductItemMng
						key={index}
						product={product}
						index={index}
						onDelete={this.onDelete}
					/>
				);
			});
		} else {
			result = <tr><td className="text-center" colSpan="11">Không có sản phẩm nào!</td></tr>
		}
		return result;
	}

	onSearch = (keyword) => {
		this.props.onSearchProduct(keyword);
	}

	onDelete = (product) => {
		this.props.onDeleteProduct(product);
	}

	onChangePage = (data) => {
		this.setState({
			pageLimit: data.pageLimit,
			totalPages: data.totalPages,
			currentPage: data.page,
			startIndex: data.startIndex,
			endIndex: data.endIndex
		});
	}

	render() {
		var { keyword, products } = this.props;
		var {	totalPages,
					currentPage,
					pageLimit,
					startIndex,
					endIndex } = this.state;
		var rowsPerPage = [];

		// console.log(this.state);

		// Tìm kiếm
		if(keyword) {
			products = products.filter((product) => {
				return product.name.toLowerCase().indexOf(keyword) !== -1
			});
		}

		rowsPerPage = products.slice(startIndex, endIndex + 1);

		return (
			<div className="section product_list_mng">
				<div className="container-fluid">
					<Link to='/product-mng/add' className="btn btn-primary mb-15">Thêm sản phẩm</Link>
					<div className="box_product_control mb-15">
						<div className="row">
							<ProductSearchControl
								onSearch={ this.onSearch }
								keyword={ this.props.keyword }
							/>
							<div className="col-xs-6 box_change_pagelimit">
								Hiển thị
								<select
									className="form-control"
									value={pageLimit}
									onChange={ e => this.setState({pageLimit: parseInt(e.target.value)}) }
								>
									<option value={10}>10</option>
									<option value={25}>25</option>
									<option value={50}>50</option>
									<option value={100}>100</option>
								</select>
								sản phẩm
							</div>
						</div>
					</div>
					<div className="box_tbl_list">
						<table className="table table-bordered table-hover">
							<thead>
								<tr>
									<th className="text-center">STT</th>
									<th className="text-center">Ảnh</th>
									<th className="text-center">Tên sản phẩm</th>
									<th className="text-center">Giá gốc</th>
									<th className="text-center">Giảm giá</th>
									<th className="text-center">Giá bán</th>
									<th className="text-center">Xếp hạng</th>
									<th className="text-center">Mô tả</th>
									<th className="text-center">Thương hiệu</th>
									<th className="text-center">Số lượng <br/>trong kho</th>
									<th className="text-center">Lượt xem</th>
									<th className="text-center">Hành động</th>
								</tr>
							</thead>
							<tbody>
								{ this.showProducts(rowsPerPage) }
							</tbody>
						</table>
					</div>
					<div className="box_pagination">
						<div className="row">
							<div className="col-sm-6 box_pagination_info">
								<p>{products.length} Sản phẩm | Trang {currentPage}/{totalPages}</p>
							</div>
							<div className="col-sm-6 text-right">
								<Pagination
									totalRecords={products.length}
									pageLimit={pageLimit || 10}
									initialPage={1}
									pagesToShow={5}
									onChangePage={this.onChangePage}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProductListMngPage.propTypes = {
	products: PropTypes.arrayOf(
		PropTypes.shape({
			// id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			photo: PropTypes.string.isRequired,
			price_original: PropTypes.number.isRequired,
			discount: PropTypes.number.isRequired,
			rating: PropTypes.number.isRequired,
			description: PropTypes.string.isRequired,
			trademark: PropTypes.string.isRequired,
			inventory: PropTypes.number.isRequired
		})
	).isRequired,
	keyword: PropTypes.string,
	fetchAllProducts: PropTypes.func.isRequired,
	onSearchProduct: PropTypes.func.isRequired,
	onDeleteProduct: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		products: state.products,
		keyword: state.search
	};
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		fetchAllProducts: () => {
			dispatch(actFetchProductsRequest());
		},
		onSearchProduct: (keyword) => {
			dispatch(actSearchProduct(keyword));
		},
		onDeleteProduct: (product) => {
			dispatch(actDeleteProductRequest(product));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListMngPage);
