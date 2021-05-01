import { Avatar, Popover } from 'antd';
import {
  FETCH_START,
  FETCH_SUCCESS,
  SIGNOUT_USER_SUCCESS,
} from '../../constants/ActionTypes';
import { useDispatch, useSelector } from 'react-redux';

import { REMOVE_SESSION_MUTATION } from '../../gql';
import React from 'react';
import { useMutation } from '@apollo/client';

const UserProfile = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(({ auth }) => auth.authUser);
  const [logout] = useMutation(REMOVE_SESSION_MUTATION);

  const logoutEvent = async () => {
    dispatch({ type: FETCH_START });

    await logout({
      variables: { accessToken: localStorage.getItem('token') },
    })
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SIGNOUT_USER_SUCCESS });
      })
      .catch(() => {
        dispatch({ type: FETCH_SUCCESS });
      });
  };
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Connections</li>
      <li onClick={logoutEvent}>Logout</li>
    </ul>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
      <Popover
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        <Avatar className="gx-size-40 gx-pointer gx-mr-3" alt="">
          {authUser.firstName[0]}
          {authUser.lastName[0]}
        </Avatar>
        <span className="gx-avatar-name">
          {authUser.firstName} {authUser.lastName}
          <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
        </span>
      </Popover>
    </div>
  );
};

export default UserProfile;
