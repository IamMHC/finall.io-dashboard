import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
} from '../../constants/ThemeSetting';

import AboveHeader from '../Topbar/AboveHeader/index';
import App from 'routes/index';
import BelowHeader from '../Topbar/BelowHeader/index';
import HorizontalDark from '../Topbar/HorizontalDark/index';
import HorizontalDefault from '../Topbar/HorizontalDefault/index';
import InsideHeader from '../Topbar/InsideHeader/index';
import { Layout } from 'antd';
import NoHeaderNotification from '../Topbar/NoHeaderNotification/index';
import PrivateRoutesConfig from '../../routes/RoutesConfig';
import React from 'react';
import Sidebar from '../Sidebar/index';
import Topbar from '../Topbar/index';
import { footerText } from 'util/config';
import { getAllowedRoutes } from '../../util/getAllowedRoutes';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Content, Footer } = Layout;

const MainApp = () => {
  const { navStyle } = useSelector(({ settings }) => settings);
  const match = useRouteMatch();
  const { authUser } = useSelector(({ auth }) => auth);

  const getContainerClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DARK_HORIZONTAL:
        return 'gx-container-wrap';
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return 'gx-container-wrap';
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return 'gx-container-wrap';
      case NAV_STYLE_BELOW_HEADER:
        return 'gx-container-wrap';
      case NAV_STYLE_ABOVE_HEADER:
        return 'gx-container-wrap';
      default:
        return '';
    }
  };
  const getNavStyles = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return <HorizontalDefault />;
      case NAV_STYLE_DARK_HORIZONTAL:
        return <HorizontalDark />;
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return <InsideHeader />;
      case NAV_STYLE_ABOVE_HEADER:
        return <AboveHeader />;
      case NAV_STYLE_BELOW_HEADER:
        return <BelowHeader />;
      case NAV_STYLE_FIXED:
        return <Topbar />;
      case NAV_STYLE_DRAWER:
        return <Topbar />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Topbar />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <NoHeaderNotification />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <NoHeaderNotification />;
      default:
        return null;
    }
  };

  return (
    <Layout className="gx-app-layout">
      <Sidebar />
      <Layout>
        {getNavStyles(navStyle)}
        <Content
          className={`gx-layout-content ${getContainerClass(navStyle)} `}
        >
          <App
            routes={getAllowedRoutes(PrivateRoutesConfig, [authUser.role])}
            match={match}
          />
          <Footer>
            <div className="gx-layout-footer-content">{footerText}</div>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainApp;
