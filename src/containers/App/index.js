import {
  FETCH_START,
  FETCH_SUCCESS,
  UPDATE_LOAD_USER,
  USER_DATA,
} from '../../constants/ActionTypes';
import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_TYPE_DARK,
} from '../../constants/ThemeSetting';
import React, { memo, useEffect } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import {
  onLayoutTypeChange,
  onNavStyleChange,
  setThemeType,
} from 'appRedux/actions/Setting';
import { useDispatch, useSelector } from 'react-redux';

import AppLocale from 'lngProvider';
import CircularProgress from '../../components/CircularProgress';
import { ConfigProvider } from 'antd';
import ForgotPassword from '../ForgotPassword';
import { IntlProvider } from 'react-intl';
import MainApp from './MainApp';
import { PROFILE_QUERY } from '../../gql';
import ResetPassword from '../ResetPassword';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import URLSearchParams from 'url-search-params';
import VerifyAccount from '../VerifyAccount';
import { setInitUrl } from 'appRedux/actions/Auth';
import { useQuery } from '@apollo/client';

const RestrictedRoute = ({
  component: Component,
  location,
  authUser,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { locale, navStyle, layoutType, themeType } = useSelector(
    ({ settings }) => settings
  );
  const { initURL, loadingAuthUser, authUser } = useSelector(
    ({ auth }) => auth
  );

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const { error, data, loading } = useQuery(PROFILE_QUERY);
  useEffect(() => {
    if (themeType === THEME_TYPE_DARK) {
      document.body.classList.add('dark-theme');
    }
  }, [themeType]);
  useEffect(() => {
    if (loading) {
      dispatch({ type: FETCH_START });
    } else {
      dispatch({ type: FETCH_SUCCESS });
    }
  }, [dispatch, loading]);

  useEffect(() => {
    if (data) {
      dispatch({ type: USER_DATA, payload: data.profile });
    }
  }, [dispatch, data]);
  useEffect(() => {
    if (error) {
      dispatch({ type: UPDATE_LOAD_USER, payload: false });
      console.log('Error****:', error.message);
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (initURL === '') {
      if (location.pathname === '/account/verify') {
        dispatch(setInitUrl('/login'));
      } else {
        dispatch(setInitUrl(location.pathname + location.search));
      }
    }
    const params = new URLSearchParams(location.search);

    if (params.has('theme')) {
      dispatch(setThemeType(params.get('theme')));
    }
    if (params.has('nav-style')) {
      dispatch(onNavStyleChange(params.get('nav-style')));
    }
    if (params.has('layout-type')) {
      dispatch(onLayoutTypeChange(params.get('layout-type')));
    }
    setLayoutType(layoutType);
    setNavStyle(navStyle);
  }, [
    dispatch,
    initURL,
    layoutType,
    location.pathname,
    location.search,
    navStyle,
  ]);

  const setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };

  const setNavStyle = (navStyle) => {
    if (
      navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER
    ) {
      document.body.classList.add('full-scroll');
      document.body.classList.add('horizontal-layout');
    } else {
      document.body.classList.remove('full-scroll');
      document.body.classList.remove('horizontal-layout');
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      console.log(
        '🚀 ~ file: index.js ~ line 187 ~ useEffect ~ initURL',
        initURL
      );
      if (authUser === null) {
        history.push('/login');
      } else if (
        [
          '',
          '/',
          '/login',
          '/signup',
          '/login/forgot-password',
          '/login/reset-password',
        ].includes(initURL)
      ) {
        history.push('/dashboard');
      } else {
        history.push(initURL);
      }
    }
  }, [authUser, initURL, location, history]);

  const currentAppLocale = AppLocale[locale.locale];

  return loadingAuthUser ? (
    <CircularProgress />
  ) : (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            path="/login/forgot-password"
            component={ForgotPassword}
          />
          <Route exact path="/login/reset-password" component={ResetPassword} />
          <Route exact path="/account/verify" component={VerifyAccount} />
          <RestrictedRoute
            path={`${match.url}`}
            authUser={authUser}
            location={location}
            component={MainApp}
          />
        </Switch>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default memo(App);
