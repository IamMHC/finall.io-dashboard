import { Button, Form, Input, Space, message } from 'antd';
import { LOGIN_MUTATION, PROFILE_QUERY } from '../gql';
import React, { useEffect, useState } from 'react';
import {
  UPDATE_LOAD_USER,
  USER_DATA,
  USER_TOKEN_SET,
} from '../constants/ActionTypes';
import { fetchStart, fetchSuccess } from '../appRedux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';

import InfoView from 'components/InfoView';
import IntlMessages from 'util/IntlMessages';
import { Link } from 'react-router-dom';

const SignIn = (props) => {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const { error, data } = useQuery(PROFILE_QUERY, { skip: !loggedIn });

  const formRef = React.useRef();

  const authUser = useSelector(({ auth }) => auth.authUser);
  const [login] = useMutation(LOGIN_MUTATION);
  useEffect(() => {
    if (data) {
      dispatch({ type: USER_DATA, payload: data.profile });
      dispatch(fetchSuccess());
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (error) {
      dispatch({ type: UPDATE_LOAD_USER, payload: false });
      console.log('Error****:', error.message);
    }
  }, [dispatch, error]);

  const onFinish = async (values) => {
    dispatch(fetchStart());

    await login({ variables: values })
      .then(
        ({
          data: {
            login: { accessToken, refreshToken },
          },
        }) => {
          localStorage.setItem('token', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          dispatch({ type: USER_TOKEN_SET, payload: accessToken });

          setLoggedIn(true);
        }
      )
      .catch((err) => {
        dispatch(fetchSuccess());

        if (err.message.includes('email') || err.message.includes('username')) {
          return formRef.current.setFields([
            { name: 'username', errors: [err.message] },
          ]);
        } else if (err.message.includes('password')) {
          return formRef.current.setFields([
            { name: 'password', errors: [err.message] },
          ]);
        }
        return message.error(err.message);
      });
  };

  useEffect(() => {
    if (authUser !== null) {
      props.history.push('/');
    }
  }, [authUser, props.history]);

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
              <img src="https://via.placeholder.com/272x395" alt="Neature" />
            </div>
            <div className="gx-app-logo-wid">
              <h1>
                <IntlMessages id="app.userAuth.signIn" />
              </h1>
              <p>
                <IntlMessages id="app.userAuth.bySigning" />
              </p>
              <p>
                <IntlMessages id="app.userAuth.getAccount" />
              </p>
            </div>
            <div className="gx-app-logo">
              <img alt="example" src="/assets/images/logo.png" />
            </div>
          </div>
          <div className="gx-app-login-content">
            <Form
              ref={formRef}
              name="basic"
              onFinish={onFinish}
              className="gx-signin-form gx-form-row0"
            >
              <Form.Item
                initialValue=""
                rules={[
                  { required: true, message: 'The input is not valid E-mail!' },
                ]}
                name="username"
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                initialValue=""
                rules={[
                  { required: true, message: 'Please input your Password!' },
                  {
                    min: 8,
                    message: 'Your password must be at least 8 character',
                  },
                ]}
                name="password"
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
              <Space direction="vertical" size="large">
                <Link
                  className="gx-login-form-forgot"
                  to="/custom-views/user-auth/forgot-password"
                >
                  Forgot password
                </Link>
                <Form.Item>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.signIn" />
                  </Button>
                  <span>
                    <IntlMessages id="app.userAuth.or" />
                  </span>{' '}
                  <Link to="/signup">
                    <IntlMessages id="app.userAuth.signUp" />
                  </Link>
                </Form.Item>
              </Space>
            </Form>
          </div>
          <InfoView />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
