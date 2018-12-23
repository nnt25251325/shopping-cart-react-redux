import React, { Component } from 'react';

class ProductSortControl extends Component {
	onClick = (sortBy, sortValue) => {
		this.props.onSort({
			by: sortBy,
			value: sortValue
		});
	}

	render() {
		var { sort } = this.props;
		// console.log(sort);
		return (
			<div className="col-xs-3 box_sort">
				<div className="dropdown dropdown_sort">
					<button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Sắp Xếp <i className="fa fa-caret-square-o-down ml-5"></i></button>
					<ul className="dropdown-menu">
						<li onClick={() => this.onClick('name', 1)}>
							<span className={ (sort.by === 'name' && sort.value === 1) ? 'sort_selected' : ''}>
								<span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
							</span>
						</li>
						<li onClick={() => this.onClick('name', -1)}>
							<span className={ (sort.by === 'name' && sort.value === -1) ? 'sort_selected' : ''}>
								<span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
							</span>
						</li>
						<li role="separator" className="divider" />
						<li onClick={() => this.onClick('price_sale', 1)}>
							<span className={ (sort.by === 'price_sale' && sort.value === 1) ? 'sort_selected' : ''}>
								Giá tăng dần
							</span>
						</li>
						<li onClick={() => this.onClick('price_sale', -1)}>
							<span className={ (sort.by === 'price_sale' && sort.value === -1) ? 'sort_selected' : ''}>
								Giá giảm dần
							</span>
						</li>
						<li role="separator" className="divider" />
						<li onClick={() => this.onClick('count_view', -1)}>
							<span className={ (sort.by === 'count_view' && sort.value === -1) ? 'sort_selected' : ''}>
								Xem nhiều
							</span>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default ProductSortControl;