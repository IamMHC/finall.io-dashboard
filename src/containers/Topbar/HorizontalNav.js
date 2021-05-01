import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
} from '../../constants/ThemeSetting';

import IntlMessages from '../../util/IntlMessages';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import PrivateRoutesConfig from '../../routes/RoutesConfig';
import React from 'react';
import { getAllowedRoutes } from '../../util/getAllowedRoutes';
import { useSelector } from 'react-redux';

const SubMenu = Menu.SubMenu;

const HorizontalNav = () => {
  const navStyle = useSelector(({ settings }) => settings.navStyle);
  const { pathname } = useSelector(({ common }) => common);
  const { authUser } = useSelector(({ auth }) => auth);

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
        {getAllowedRoutes(PrivateRoutesConfig, [authUser.role]).map(
          ({ path, icon, langKey }) => {
            return (
              <Menu.Item key={path}>
                <Link to={`/${path}`}>
                  <i className={`icon icon-${icon || 'widgets'}`} />
                  <IntlMessages id={langKey} />
                </Link>
              </Menu.Item>
            );
          }
        )}
      </SubMenu>
    </Menu>
  );
};

HorizontalNav.propTypes = {};

export default HorizontalNav;
