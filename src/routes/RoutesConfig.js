// Components
import Roles from '../constants/Roles';
import asyncComponent from 'util/asyncComponent';

const routeList = [
  {
    component: asyncComponent(() => import('./DashboardPage')),
    path: 'dashboard',
    title: 'Dashboard',
    exact: true,
    langKey: 'sidebar.dashboard',
    icon: 'dasbhoard',
  },
  {
    component: asyncComponent(() => import('./UsersPage')),
    path: 'user-list',
    title: 'Users',
    permission: [Roles.ADMIN],
    icon: 'contacts',
    langKey: 'sidebar.user-list',
  },
  {
    component: asyncComponent(() => import('./WidgetsPage')),
    path: 'widgets',
    title: 'Widgets',
    icon: 'widgets',
    langKey: 'sidebar.widgets',
  },
  {
    component: asyncComponent(() => import('./SettingPage')),
    path: 'settings',
    title: 'Settings',
    icon: 'setting',
    langKey: 'sidebar.setting',
  },
];
export default routeList;
