import React from 'react';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListMngPage from './pages/ProductListMngPage';
import ProductActionMngPage from './pages/ProductActionMngPage';
import CartPage from './pages/CartPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import RestoreProducts from './pages/RestoreProducts';

const routes = [
	{
		path: '/',
		exact: true,
		main: () => <HomePage />
	},
	{
		path: '/product-list',
		exact: false,
		main: () => <ProductListPage />
	},
	{
		path: '/product-detail/:slug.:id',
		exact: false,
		main: ({match}) => <ProductDetailPage match={match} />
	},
	{
		path: '/product-list-mng',
		exact: false,
		main: () => <ProductListMngPage />
	},
	{
		path: '/product-mng/add',
		exact: false,
		main: ({history}) => <ProductActionMngPage history={history} />
	},
	{
		path: '/product-mng/:id/edit',
		exact: false,
		main: ({match, history}) => <ProductActionMngPage match={match} history={history} />
	},
	{
		path: '/cart',
		exact: false,
		main: () => <CartPage />
	},
	{
		path: '/payment-success',
		exact: false,
		main: () => <PaymentSuccessPage />
	},
	{
		path: '/restore-products',
		exact: false,
		main: () => <RestoreProducts />
	},
	{
		path: '',
		exact: false,
		main: () => <NotFoundPage />
	}
];

export default routes;
