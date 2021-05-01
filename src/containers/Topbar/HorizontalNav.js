import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
} from '../../constants/ThemeSetting';

import IntlMessages from '../../util/IntlMessages';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const SubMenu = Menu.SubMenu;

const HorizontalNav = () => {
  const navStyle = useSelector(({ settings }) => settings.navStyle);
  const { pathname } = useSelector(({ common }) => common);

  const getNavStyleSubMenuClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return 'gx-menu-horizontal gx-submenu-popup-curve';
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return 'gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve';
      case NAV_STYLE_BELOW_HEADER:
        return 'gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve';
      case NAV_STYLE_ABOVE_HEADER:
        return 'gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve';
      default:
        return 'gx-menu-horizontal';
    }
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];
  return (
    <Menu
      defaultOpenKeys={[defaultOpenKeys]}
      selectedKeys={[selectedKeys]}
      mode="horizontal"
    >
      <SubMenu
        className={getNavStyleSubMenuClass(navStyle)}
        key="main"
        title={<IntlMessages id="sidebar.main" />}
      >
        <Menu.Item key="dashboard">
          <Link to="/dashboard">
            <i className="icon icon-widgets" />
            <IntlMessages id="sidebar.dashboard" />
          </Link>
        </Menu.Item>
        <Menu.Item key="user-list">
          <Link to="/user-list">
            <i className="icon icon-contacts" />
            <IntlMessages id="sidebar.user-list" />
          </Link>
        </Menu.Item>
        <Menu.Item key="setting">
          <Link to="/setting">
            <i className="icon icon-setting" />
            <IntlMessages id="sidebar.setting" />
          </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

HorizontalNav.propTypes = {};

export default HorizontalNav;
