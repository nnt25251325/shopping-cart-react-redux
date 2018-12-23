import * as Types from '../constants/ActionTypes';

var initialState = {};

const itemEditing = (state = initialState, action) => {
	switch(action.type) {
		//Lưu sản phẩm đang chỉnh sửa lên store, tên state là itemEditing
		case Types.EDIT_PRODUCT:
			return action.product;

		default:
			return state;
	}
};

export default itemEditing;
