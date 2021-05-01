import { Route, Switch } from 'react-router-dom';

import React from 'react';
import asyncComponent from 'util/asyncComponent';

const App = ({ routes, match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      {routes.map((route) => {
        const {
          path,
          component: Component,
          children,
          title,
          permission,
          ...rest
        } = route;
        return (
          <Route
            {...rest}
            key={path}
            path={`${match.url}${path}`}
            component={Component}
          ></Route>
        );
      })}

      <Route component={asyncComponent(() => import('./404'))} />
    </Switch>
  </div>
);

export default App;
