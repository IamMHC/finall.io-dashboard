import IntlMessages from 'util/IntlMessages';
import React from 'react';

const DashboardPage = () => {
  return (
    <div>
      <h2 className="title gx-mb-4">
        <IntlMessages id="sidebar.dashboard" />
      </h2>

      <div className="gx-d-flex justify-content-center">
        <h4>Start building your app. Happy Coding!</h4>
      </div>
    </div>
  );
};

export default DashboardPage;
