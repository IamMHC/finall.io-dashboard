import { Button, Form, Input, Space, message } from 'antd';
import React, { useEffect } from 'react';
import { fetchStart, fetchSuccess } from '../appRedux/actions';
import { useDispatch, useSelector } from 'react-redux';

import { FORGOT_PASSWORD_MUTATION } from '../gql';
import InfoView from 'components/InfoView';
import IntlMessages from 'util/IntlMessages';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

const ForgotPassword = (props) => {
  const dispatch = useDispatch();

  const formRef = React.useRef();

  const authUser = useSelector(({ auth }) => auth.authUser);
  const [forgotPassword] = useMutation(FORGOT_PASSWORD_MUTATION);

  const onFinish = async (values) => {
    dispatch(fetchStart());

    await forgotPassword({ variables: values })
      .then(({ data: { forgotPassword } }) => {
        dispatch(fetchSuccess());
        formRef.current.setFields([{ name: 'username', value: '' }]);
        message.success(forgotPassword.message);
        props.history.push('/login');
      })
      .catch((err) => {
        dispatch(fetchSuccess());

        if (err.message.includes('email') || err.message.includes('username')) {
          return formRef.current.setFields([
            { name: 'username', errors: [err.message] },
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
                <IntlMessages id="app.userAuth.forgotPassword" />
              </h1>
              <p>
                <IntlMessages id="app.userAuth.forgot" />
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
                  { required: true, message: 'This is a required field' },
                ]}
                name="username"
              >
                <Input placeholder="Email or Username" />
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

export default ForgotPassword;
