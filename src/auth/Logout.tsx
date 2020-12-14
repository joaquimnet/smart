import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BACKEND_URL } from '../config';
import { LOGOUT } from '../reducers/actions';

export const Logout = () => {
  const dispatch = useDispatch();
  const { tokens } = useSelector((state: any) => state.auth);

  const [redirect, setRedirect] = useState<null | string>(null);
  const [working, setWorking] = useState(false);

  const onDone = () => {
    dispatch({ type: LOGOUT });
    setRedirect('/');
  };

  const doLogout = () => {
    setWorking(true);
    axios
      .post(BACKEND_URL + '/auth/logout', null, {
        headers: { authorization: `Bearer ${tokens.refresh}` },
      })
      .then(onDone)
      .catch(onDone);
  };

  if (!working) doLogout();

  return redirect ? <Redirect to={redirect} /> : null;
};
