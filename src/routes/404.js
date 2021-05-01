import { Link } from 'react-router-dom';
import React from 'react';

const _404 = () => {
  return (
    <div className="gx-page-error-container">
      <div className="gx-page-error-content">
        <div className="gx-error-code gx-mb-4">404</div>
        <h2 className="gx-text-center">Page Not Found</h2>
        <form className="gx-mb-4" role="search">
          <div className="gx-search-bar">
            <div className="gx-form-group">
              <input
                type="search"
                className="ant-input ant-input-lg"
                placeholder="Search..."
              />
              <button className="gx-search-icon">
                <i className="icon icon-search" />
              </button>
            </div>
          </div>
        </form>
        <p className="gx-text-center">
          <Link to="/dashboard" className="gx-btn gx-btn-primary">
            Go to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default _404;
