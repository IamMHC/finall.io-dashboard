import Customizer from '../../containers/Customizer';
import IntlMessages from 'util/IntlMessages';
import React from 'react';
import { useSelector } from 'react-redux';

const SettingPage = () => {
  const authUser = useSelector(({ auth }) => auth.authUser);
  console.log(
    '🚀 ~ file: index.js ~ line 23 ~ SettingPage ~ authUser',
    authUser
  );

  return (
    <div>
      {authUser?.themePermission && <Customizer />}

      <h2 className="title gx-mb-4">
        <IntlMessages id="sidebar.setting" />
      </h2>

      <div className="gx-d-flex justify-content-center">
        <h4>Start building your app. Happy Coding!</h4>
      </div>
    </div>
  );
};

export default SettingPage;
