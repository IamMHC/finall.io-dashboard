import { Button, Form, Input, Space, message } from 'antd';
import {
  PROFILE_QUERY,
  SINGUP_MUTATION,
  USERNAME_AVAILABLE_QUERY,
} from '../gql';
import React, { useEffect, useRef, useState } from 'react';
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

const FormItem = Form.Item;

const SignUp = (props) => {
  const dispatch = useDispatch();
  const authUser = useSelector(({ auth }) => auth.authUser);
  const [signUp] = useMutation(SINGUP_MUTATION);
  const formRef = useRef();
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const { error, data } = useQuery(PROFILE_QUERY, { skip: !loggedIn });

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

  const { error: usernameError } = useQuery(USERNAME_AVAILABLE_QUERY, {
    variables: { username },
    fetchPolicy: 'cache-and-network',
    skip: !Boolean(username),
    onError: (error) => {
      if (error.message.includes('username')) {
        return formRef.current.setFields([
          { name: 'username', errors: [error.message] },
        ]);
      }
      return message.error(error.message);
    },
  });

  const onFinishFailed = (errorInfo) => {
    if (usernameError) {
      return formRef.current.setFields([
        { name: 'username', errors: [usernameError.message] },
      ]);
    }
  };

  const onFinish = async (variables) => {
    if (usernameError) {
      return formRef.current.setFields([
        { name: 'username', errors: [usernameError.message] },
      ]);
    }
    dispatch(fetchStart());

    await signUp({ variables })
      .then(
        ({
          data: {
            signup: { accessToken, refreshToken },
          },
        }) => {
          localStorage.setItem('token', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          dispatch({ type: USER_TOKEN_SET, payload: accessToken });

          setLoggedIn(true);
        }
      )
      .catch((error) => {
        dispatch(fetchSuccess());
        let fieldName = null;
        if (error.message.includes('email address')) fieldName = 'email';
        if (error.message.includes('username')) fieldName = 'username';
        if (error.message.includes('password')) fieldName = 'password';
        if (fieldName) {
          return formRef.current.setFields([
            { name: fieldName, errors: [error.message] },
          ]);
        }
        return message.error(error.message);
      });
    // dispatch(userSignUp(values));
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
                <IntlMessages id="app.userAuth.signUp" />
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
              initialValues={{ remember: true }}
              name="basic"
              ref={formRef}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0"
            >
              <Space size={'large'}>
                <FormItem
                  rules={[
                    {
                      required: true,
                      message: 'Please input your firstname!',
                    },
                  ]}
                  name="firstName"
                >
                  <Input placeholder="First Name" />
                </FormItem>
                <FormItem
                  rules={[
                    {
                      required: true,
                      message: 'Please input your lastname!',
                    },
                  ]}
                  name="lastName"
                >
                  <Input placeholder="Last Name" />
                </FormItem>
              </Space>

              <FormItem
                getValueFromEvent={({ target: { value } }) => {
                  const regex = new RegExp(
                    /^[a-zA-Z0-9]([_](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/
                  );
                  if (Boolean(regex.exec(value || ''))) {
                    setUsername(value);
                  }
                  return value;
                }}
                rules={[
                  { required: true, message: 'Please input your username!' },
                  {
                    pattern: /^[a-zA-Z0-9]([_](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/,
                    message: 'Please enter a valid username',
                  },
                ]}
                name="username"
              >
                <Input placeholder="Username" />
              </FormItem>

              <FormItem
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </FormItem>
              <FormItem
                name="password"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                  {
                    min: 8,
                    message: 'Your password must be at least 8 character',
                  },
                ]}
              >
                <Input type="password" placeholder="Password" />
              </FormItem>
              {/* <FormItem>
                <Checkbox>
                  <IntlMessages id="appModule.iAccept" />
                </Checkbox>
                <span className="gx-signup-form-forgot gx-link">
                  <IntlMessages id="appModule.termAndCondition" />
                </span>
              </FormItem> */}
              <FormItem>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signUp" />
                </Button>
                <span>
                  <IntlMessages id="app.userAuth.or" />
                </span>{' '}
                <Link to="/signin">
                  <IntlMessages id="app.userAuth.signIn" />
                </Link>
              </FormItem>
            </Form>
          </div>
          <InfoView />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
