import React, { Component } from 'react';

class WidgetFilterTrademark extends Component {
	constructor(props) {
		super(props);
		this.state = {
			limitItem: 5,
			isShowAll: false
		};
	}

	showTrademarkItem = () => {
		var trademarkList = [],
				result,
				total = 0,
				isChecked = false;
		if(this.state.isShowAll) {//hiện tất cả
			trademarkList = this.props.trademarkList;
		} else {//hiện có giới hạn
			trademarkList = this.props.trademarkList.slice(0, this.state.limitItem)
		}
		result = trademarkList.map((trademark, index) => {
			total = 0;
			if(this.props.filterTrademark.length > 0) {
				isChecked = false;
				this.props.filterTrademark.forEach((item) => {
					if(trademark === item) isChecked = true;
				});
			}
			this.props.products.forEach((product) => {
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
					{ this.showTrademarkItem() }
					{this.props.trademarkList.length > this.state.limitItem ?
						<button onClick={ () => this.setState({ isShowAll: !this.state.isShowAll }) } className="btn_readmore">
							{ this.state.isShowAll ? 'Thu gọn' : 'Xem thêm' }
						</button> : ''
					}
				</ul>
			</div>
		);
	}
}

WidgetFilterTrademark.defaultProps = {
	trademarkList: ['Apple', 'Samsung', 'Nokia', 'Sony', 'Xiaomi', 'Philips', 'Vsmart', 'OPPO']
};

export default WidgetFilterTrademark;
