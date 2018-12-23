import * as Types from  '../constants/ActionTypes';

var initialState = false;

var paymentSuccess = (state = initialState, action) => {
	switch(action.type) {
		case Types.PAYMENT_SUCCESS:
			console.log(action);
			return action.paymentStatus;

		default:
			return state;
	}
};

export default paymentSuccess;
