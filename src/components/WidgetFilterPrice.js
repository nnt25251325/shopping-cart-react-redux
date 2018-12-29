import React, { Component } from 'react';

class WidgetFilterPrice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			limitItem: 5,
			isShowAll: false
		};
	}

	showPriceRangeItem = () => {
		var priceRangeList = [],
				result,
				total = 0,
				price_sale = 0,
				isChecked = false;
		if(this.state.isShowAll) {//hiện tất cả
			priceRangeList = this.props.priceRangeList;
		} else {//hiện có giới hạn
			priceRangeList = this.props.priceRangeList.slice(0, this.state.limitItem)
		}
		result = priceRangeList.map((range, index) => {
			total = 0;
			if(this.props.filterPrice.length > 0) {
				isChecked = false;
				this.props.filterPrice.forEach((item) => {
					if(range.split(",")[0] === item.name) isChecked = true;
				});
			}
			this.props.products.forEach((product) => {
				price_sale = parseInt(product.price_original*(100-product.discount)/100);
				if(range.split(",")[2] === 'infinity') {
					if(price_sale >= parseInt(range.split(",")[1])) {
						total++;
					}
				} else {
					if(price_sale >= parseInt(range.split(",")[1]) && price_sale <= parseInt(range.split(",")[2])) {
						total++;
					}
				}
			});
			return (
				<li key={index}>
					<div className="checkbox">
						<label>
							<input
								type="checkbox"
								className="cbk"
								name="priceRange"
								checked={isChecked}
								value={range}
								onChange={this.onHandleChange}
							/>
							{range.split(",")[3]} ({total})
						</label>
					</div>
				</li>
			);
		});
		return result;
	}

	onHandleChange = (e) => {
		if(e.target.type === 'checkbox') {
			this.props.onFilterPrice({
				range: e.target.value.split(","),
				isChecked: e.target.checked
			});
		}
	}

	onUnCheckFilter = () => {
		this.props.onUnCheckFilter();
	}

	render() {
		return (
			<div className="widget widget_price">
				<h5 className="st_title"><strong>Giá sản phẩm</strong></h5>
				<ul>
					{ this.showPriceRangeItem() }
				</ul>
				{this.props.priceRangeList.length > this.state.limitItem ?
					<button onClick={ () => this.setState({ isShowAll: !this.state.isShowAll }) } className="btn_readmore">
						{ this.state.isShowAll ? 'Thu gọn' : 'Xem thêm' }
					</button> : ''
				}
			</div>
		);
	}
}

WidgetFilterPrice.defaultProps = {
	priceRangeList: [	'range_01,0,20,Dưới 20đ',
										'range_02,20,40,Từ 20đ đến 40đ',
										'range_03,40,60,Từ 40đ đến 60đ',
										'range_04,60,80,Từ 60đ đến 80đ',
										'range_05,80,100,Từ 80đ đến 100đ',
										'range_06,100,infinity,Trên 100đ']
};

export default WidgetFilterPrice;
