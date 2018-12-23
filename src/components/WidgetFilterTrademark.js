import React, { Component } from 'react';

const trademarkList = ["Apple", "Samsung", "Nokia", "Sony", "Xiaomi"];

class WidgetFilterTrademark extends Component {
	showTrademarkItem = (trademarkList) => {
		var { filterTrademark, products } = this.props;
		var result = [];
		var total = 0;
		var isChecked = false;
		result = trademarkList.map((trademark, index) => {
			total = 0;
			if(filterTrademark.length > 0) {
				isChecked = false;
				filterTrademark.forEach((item) => {
					if(trademark === item) isChecked = true;
				});
			}
			products.forEach((product) => {
				if(trademark === product.trademark) total++;
			});
			return (
				<li key={index}>
					<div className="checkbox">
						<label>
							<input
								type="checkbox"
								className="cbk"
								name="trademark"
								checked={isChecked}
								value={trademark}
								onChange={this.onHandleChange}
							/>
							{trademark} ({total})
						</label>
					</div>
				</li>
			);
		});
		return result;
	}

	onHandleChange = (e) => {
		if(e.target.type === 'checkbox') {
			this.props.onFilterTrademark({
				trademark: e.target.value,
				isChecked: e.target.checked
			});
		}
	}

	onUnCheckFilter = () => {
		this.props.onUnCheckFilter();
	}

	render() {
		return (
			<div className="widget widget_trademark">
				<h5 className="st_title"><strong>Thương hiệu</strong></h5>
				<ul>
					{ this.showTrademarkItem(trademarkList) }
				</ul>
			</div>
		);
	}
}

export default WidgetFilterTrademark;
