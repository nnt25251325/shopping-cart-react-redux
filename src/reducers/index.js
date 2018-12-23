import { combineReducers } from 'redux';
import products from './products';
import itemEditing from './itemEditing';
import search from './search';
import sort from './sort';
import cart from './cart';
import paymentSuccess from './paymentSuccess';
import filterTrademark from './filterTrademark';
import filterPrice from './filterPrice';
import filterRating from './filterRating';

const appReducers = combineReducers({
	products,
	itemEditing,
	search,
	sort,
	cart,
	paymentSuccess,
	filterTrademark,
	filterPrice,
	filterRating
});

export default appReducers;
