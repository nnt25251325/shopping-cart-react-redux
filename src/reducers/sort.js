import * as Types from  '../constants/ActionTypes';

var initialState = {
	by: 'id',
	value: 1 // 1: tăng, -1 giảm
};

var sort = (state = initialState, action) => {
	switch(action.type) {
		case Types.SORT:
			return action.sort;

		default:
			return state;
	}
};

export default sort;
