import * as Types from  '../constants/ActionTypes';

var initialState = [];

var products = (state = initialState, action) => {
	var index = -1;
	var { product } = action;
	switch(action.type) {
		//Hiển thị danh sách sản phẩm
		case Types.FETCH_PRODUCTS:
			state = action.products;
			// console.log(state);
			return [...state];

		//Thêm sản phẩm
		case Types.ADD_PRODUCT:
			console.log(action);
			state.push(product);
			return [...state];

		//Cập nhật sản phẩm
		case Types.UPDATE_PRODUCT:
			console.log(action);
			index = findIndex(state, product.id);
			state[index] = product;

			// console.log(state);
			return [...state];

		//Xoá sản phẩm
		case Types.DELETE_PRODUCT:
			console.log(action);
			index = findIndex(state, product.id);
			state.splice(index, 1);
			return [...state];

		default:
			return [...state];
	}
};

var findIndex = (list, id) => {
	var result = -1;
	if(list.length > 0) {
		for (let i = 0; i < list.length; i++) {
			if(list[i].id === id) {
				result = i;
				break;
			}
		}
	}
	return result;
};

export default products;
