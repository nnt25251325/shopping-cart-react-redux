import React, { Component } from 'react';

const priceRangeList = ["range_01,0,20,Dưới 20đ",
												"range_02,20,40,Từ 20đ đến 40đ",
												"range_03,40,60,Từ 40đ đến 60đ",
												"range_04,60,80,Từ 60đ đến 80đ",
												"range_05,80,infinity,Trên 80đ"];

class WidgetFilterPrice extends Component {
	showPriceRangeItem = (priceRangeList) => {
		var { products, filterPrice } = this.props;
		var result = [];
		var total = 0;
		var price_sale = 0;
		var isChecked = false;
		result = priceRangeList.map((range, index) => {
			total = 0;
			if(filterPrice.length > 0) {
				isChecked = false;
				filterPrice.forEach((item) => {
					if(range.split(",")[0] === item.name) isChecked = true;
				});
			}
			products.forEach((product) => {
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
					{ this.showPriceRangeItem(priceRangeList) }
				</ul>
			</div>
		);
	}
}

export default WidgetFilterPrice;
