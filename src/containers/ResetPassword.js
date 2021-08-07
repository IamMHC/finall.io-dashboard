import { Button, Form, Input, Space, message } from 'antd';
import { FETCH_START, FETCH_SUCCESS } from '../constants/ActionTypes';
import React, { useEffect, useState } from 'react';
import { fetchStart, fetchSuccess } from '../appRedux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';

import InfoView from 'components/InfoView';
import IntlMessages from 'util/IntlMessages';
import { Link } from 'react-router-dom';
import { RESET_PASSWORD_MUTATION } from '../gql';
import { VERIFY_VERFICATION_CODE_QUERY } from '../gql';
import queryString from 'query-string';

const ResetPassword = (props) => {
  const dispatch = useDispatch();

  const formRef = React.useRef();
  const [queryData, setQueryData] = useState({ id: null, code: null });
  const authUser = useSelector(({ auth }) => auth.authUser);
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);

  const { error, loading } = useQuery(VERIFY_VERFICATION_CODE_QUERY, {
    variables: {
      ...queryData,
      type: 'FORGOT',
    },
    skip: !Boolean(queryData.id),
  });

  useEffect(() => {
    if (loading) {
      dispatch({ type: FETCH_START });
    } else {
      dispatch({ type: FETCH_SUCCESS });
    }
  }, [dispatch, loading]);

  useEffect(() => {
    if (error) {
      props.history.push('/login');
      return message.error(error.message);
    }
  }, [dispatch, error, props.history]);

  const onFinish = async (values) => {
    dispatch(fetchStart());

    await resetPassword({ variables: { ...values, ...queryData } })
      .then(({ data: { resetPassword } }) => {
        dispatch(fetchSuccess());
        message.success(resetPassword.message);
        props.history.push('/login');
      })
      .catch((err) => {
        dispatch(fetchSuccess());

        if (err.message.includes('password')) {
          return formRef.current.setFields([
            { name: 'confirmPassword', errors: [err.message] },
            { name: 'password', errors: [''] },
          ]);
        }
        return message.error(err.message);
      });
  };

  useEffect(() => {
    const query = queryString.parse(props.history.location.search);
    if (query?.code && query?.user) {
      setQueryData({ id: query.user, code: query.code });
    }
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
                <IntlMessages id="app.userAuth.resetPassword" />
              </h1>
              <p>{/* <IntlMessages id="app.userAuth.forgot" /> */}</p>
              <p>{/* <IntlMessages id="app.userAuth.getAccount" /> */}</p>
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
                  { required: true, message: 'Please input your password!' },
                  {
                    min: 8,
                    message: 'Your password must be at least 8 character',
                  },
                ]}
                name="password"
              >
                <Input placeholder="Password" type="password" />
              </Form.Item>
              <Form.Item
                initialValue=""
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          'The confirm password that you entered do not match!'
                        )
                      );
                    },
                  }),
                ]}
                name="confirmPassword"
              >
                <Input type="password" placeholder="Confirm Password" />
              </Form.Item>

              <Space direction="vertical" size="large">
                <Form.Item>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.reset" />
                  </Button>
                  <span>
                    <IntlMessages id="app.userAuth.or" />
                  </span>{' '}
                  <Link to="/login">
                    <IntlMessages id="app.userAuth.signIn" />
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

export default ResetPassword;
