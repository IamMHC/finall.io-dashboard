import 'assets/vendors/style';
import 'styles/wieldy.less';

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { Route, Switch } from 'react-router-dom';
import configureStore, { history } from './appRedux/store';

import { ApolloProvider } from '@apollo/client/react';
import App from './containers/App/index';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import React from 'react';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.finall.io/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const store = configureStore();

const NextApp = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>
);

export default NextApp;
