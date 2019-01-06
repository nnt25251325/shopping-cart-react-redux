import * as Types from  '../constants/ActionTypes';

var initialState = [];

var filterPrice = (state = initialState, action) => {
	var index = -1;
	switch(action.type) {
		case Types.FILTER_PRICE:
			console.log(action);
			if(action.filterPrice.isChecked === true) {
				state.push({
					name: action.filterPrice.range[0],
					min: action.filterPrice.range[1],
					max: action.filterPrice.range[2],
					title: action.filterPrice.range[3]
				});
			} else {
				index = findIndex(state, action.filterPrice.range[0]);
				if(index !== -1) {
					state.splice(index, 1);
				}
			}
			return [...state];

		case Types.CLEAR_FILTER:
			console.log(action);
			state = [];
			return [...state];

		default:
			return [...state];
	}
};

var findIndex = (list, name) => {
	var result = -1;
	if(list.length > 0) {
		for (let i = 0; i < list.length; i++) {
			if(list[i].name === name) {
				result = i;
				break;
			}
		}
	}
	return result;
};

export default filterPrice;
