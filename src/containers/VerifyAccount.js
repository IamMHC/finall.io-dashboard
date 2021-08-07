import { FETCH_START, FETCH_SUCCESS } from '../constants/ActionTypes';
import { useDispatch, useSelector } from 'react-redux';
import  { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { VERIFY_EMAIL_ADDRESS } from '../gql';
import { VERIFY_VERFICATION_CODE_QUERY } from '../gql';
import { fetchSuccess } from '../appRedux/actions';
import { message } from 'antd';
import queryString from 'query-string';

const ResetPassword = (props) => {
  const dispatch = useDispatch();

  const [queryData, setQueryData] = useState({ id: null, code: null });
  const authUser = useSelector(({ auth }) => auth.authUser);
  const [verifyEmailAddress] = useMutation(VERIFY_EMAIL_ADDRESS);

  const { error, data, loading } = useQuery(VERIFY_VERFICATION_CODE_QUERY, {
    variables: {
      ...queryData,
      type: 'EMAIL',
    },
    skip: !Boolean(queryData.id),
  });

  useEffect(() => {
    if (loading) {
      dispatch({ type: FETCH_START });
    }
  }, [dispatch, loading]);

  useEffect(() => {
    if (error) {
      props.history.push('/login');
      dispatch({ type: FETCH_SUCCESS });

      return message.error(error.message);
    }
  }, [dispatch, error, props.history]);

  useEffect(() => {
    if (data) {
      (async () => {
        await verifyEmailAddress({ variables: { ...queryData, type: 'EMAIL' } })
          .then(({ data: { verifyEmailAddress } }) => {
            dispatch(fetchSuccess());
            message.success(verifyEmailAddress.message);
            props.history.push('/login');
          })
          .catch((err) => {
            dispatch(fetchSuccess());
            return message.error(err.message);
          });
      })();
    }
  }, [data,dispatch,props.history,queryData,verifyEmailAddress]);

  useEffect(() => {
    const query = queryString.parse(props.history.location.search);
    if (query?.code && query?.user) {
      setQueryData({ id: query.user, code: query.code });
    } else {
      props.history.push('/login');
    }
  }, [authUser, props.history]);

  return null;
};

export default ResetPassword;
