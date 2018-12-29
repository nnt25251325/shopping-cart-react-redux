import React, { Component } from 'react';

class WidgetFilterRating extends Component {
	showRatingRange = () => {
		var result = [];
		var total = 0;
		var isChecked = false;
		result = this.props.ratingList.map((rating, index) => {
			total = 0;
			if (this.props.filterRating !== null) {
				isChecked = false;
				if(rating === this.props.filterRating) isChecked = true;
			}
			this.props.products.forEach((product) => {
				if(product.rating >= rating) {
					total++;
				}
			});
			return (
				<li key={index}>
					<div className="radio">
						<label>
							<input
								type="radio"
								className="cbk"
								name="rating"
								checked={isChecked}
								value={rating}
								onChange={this.onHandleChange}
							/>
							{ this.showRating(rating) }
							({total})
						</label>
					</div>
				</li>
			);
		});
		return result;
	}

	showRating = (rating) => {
		if(rating > 0) {
			var result = [];
			for (var i = 1; i <= rating; i++) {
				result.push(<li key={i}><i className="fa fa-star active"></i></li>)
			}
			for (var j = 1; j <= (5-rating); j++) {
				result.push(<li key={i+j}><i className="fa fa-star"></i></li>)
			}
			return (
				<div className="product_rating">
					<ul>
						{result}
					</ul>
					<span className={rating === 5 ? "title hidden" : "title"}>trở lên</span>&nbsp;
				</div>
			);
		}
	}

	onHandleChange = (e) => {
		if(e.target.type === 'radio') {
			this.props.onFilterRating(e.target.value);
		}
	}

	onUnCheckFilter = () => {
		this.props.onUnCheckFilter();
	}

	render() {
		return (
			<div className="widget widget_rating">
				<h5 className="st_title"><strong>Đánh giá</strong></h5>
				<ul>
					{ this.showRatingRange() }
				</ul>
			</div>
		);
	}
}

WidgetFilterRating.defaultProps = {
	ratingList: [5, 4, 3, 2, 1]
};

export default WidgetFilterRating;
