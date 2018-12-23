import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const menus = [
	{
		name: 'Trang chủ',
		to: '/',
		exact: true
	},
	{
		name: 'Danh sách sản phẩm',
		to: '/product-list',
		exact: false
	},
	{
		name: 'Quản lý sản phẩm',
		to: '/product-list-mng',
		exact: false
	},
	{
		name: 'Giỏ hàng',
		to: '/cart',
		exact: false
	},
	{
		name: 'Khôi phục',
		to: '/restore-products',
		exact: false
	}
];

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
	return (
		<Route
			path={to}
			exact={activeOnlyWhenExact}
			children={
				({match}) => {
					var active = (match ? 'active' : '');
					return (
						<li className={`${active}`}>
							<Link to={to}>
								{label}
							</Link>
						</li>
					);
				}
			}
		/>
	);
};

class Menu extends Component {
	render() {
		return (
			<ul className="nav navbar-nav">
				{ this.showMenu(menus) }
			</ul>
		);
	}

	showMenu = (menus) => {
		var result = null;
		if(menus.length > 0) {
			result = menus.map((menu, index) => {
				return (
					<MenuLink
						key={index}
						label={menu.name}
						to={menu.to}
						activeOnlyWhenExact={menu.exact}
					/>
				);
			});
		}
		return result;
	}
}

export default Menu;
