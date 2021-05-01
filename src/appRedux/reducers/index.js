import Auth from './Auth';
import { combineReducers as CombineReducers } from 'redux';
import Common from './Common';
import Settings from './Settings';
import { connectRouter } from 'connected-react-router';

const combineReducers = (history) =>
  CombineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    common: Common,
  });
export default combineReducers;
