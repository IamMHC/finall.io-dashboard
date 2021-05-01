import { Route, Switch } from 'react-router-dom';

import React from 'react';
import asyncComponent from 'util/asyncComponent';

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route
        path={`${match.url}dashboard`}
        component={asyncComponent(() => import('./DashboardPage'))}
      />
      <Route
        path={`${match.url}setting`}
        component={asyncComponent(() => import('./SettingPage'))}
      />

      <Route
        path={`${match.url}user-list`}
        component={asyncComponent(() => import('./UsersPage'))}
      />
    </Switch>
  </div>
);

export default App;
