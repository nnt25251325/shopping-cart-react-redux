import * as Types from '../constants/ActionTypes';

var initialState = [];

var cart = (state = initialState, action) => {
	var { item, product, quantity } = action;
	var index = -1; //index = -1 là không tìm thấy
	switch(action.type) {
		//Hiển thị danh sách sản phẩm
		case Types.FETCH_CART:
			state = action.cart;
			// console.log(state);
			return [...state];

		//Thêm sản phẩm vào giỏ hàng
		case Types.ADD_TO_CART:
			console.log(action);
			index = findProductInCart(state, product);
			if(index === -1) {
				state.push({
					product,
					quantity
				});
			} else {
				state[index].quantity = quantity;
			}
			return [...state];

		//Xóa sản phẩm khỏi giỏ hàng
		case Types.DELETE_PRODUCT_IN_CART:
			console.log(action);
			index = findIndex(state, item.id);
			state.splice(index, 1);
			//console.log(state);
			return [...state];

		//Cập nhật số lượng sản phẩm trong giỏ hàng
		case Types.UPDATE_PRODUCT_QUANTITY:
			console.log(action);
			index = findIndex(state, item.id);
			if(index !== -1) {
				state[index].quantity = quantity;
			}
			return [...state];

		default:
			return [...state];
	}
};

var findIndex = (list, id) => {
	var result = -1;
	if(list.length > 0) {
		for (var i = 0; i < list.length; i++) {
			if(list[i].id === id) {
				result = i;
				break;
			}
		}
	}
	return result;
};

var findProductInCart = (cart, product) => {
	var index = -1;
	if(cart.length > 0) {
		for (var i = 0; i < cart.length; i++) {
			if(cart[i].product.id === product.id) {
				index = i;
				break;
			}
		}
	}
	return index;
};

export default cart;
