import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from '../../constants/ThemeSetting';

import AppsNavigation from './AppsNavigation';
import CustomScrollbars from 'util/CustomScrollbars';
import IntlMessages from '../../util/IntlMessages';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import React from 'react';
import SidebarLogo from './SidebarLogo';
import UserProfile from './UserProfile';
import { useSelector } from 'react-redux';

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  let { navStyle, themeType } = useSelector(({ settings }) => settings);
  let { pathname } = useSelector(({ common }) => common);

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return 'gx-no-header-notifications';
    }
    return '';
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];
  return (
    <>
      <SidebarLogo
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className="gx-sidebar-content">
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}
        >
          <UserProfile />
          <AppsNavigation />
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline"
          >
            <Menu.Item key="dashboard">
              <Link to="/dashboard">
                <i className="icon icon-widgets" />
                <span>
                  <IntlMessages id="sidebar.dashboard" />
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="user-list">
              <Link to="/user-list">
                <i className="icon icon-contacts" />
                <span>
                  <IntlMessages id="sidebar.user-list" />
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="setting">
              <Link to="/setting">
                <i className="icon icon-setting" />
                <span>
                  <IntlMessages id="sidebar.setting" />
                </span>
              </Link>
            </Menu.Item>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;
