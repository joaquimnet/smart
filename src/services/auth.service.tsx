import axios from 'axios';

import { BACKEND_URL } from '../config';
import { LOAD_USER, LOGOUT, UPDATE_ACCESS_TOKEN, LOGIN } from '../reducers/actions';

export const login = async (credentials: { email: string; password: string }, dispatch: any) => {
  let res;
  try {
    res = await axios.post(BACKEND_URL + '/auth/login', credentials);
    dispatch({
      type: LOGIN,
      payload: {
        user: res.data.user,
        tokens: {
          refresh: res.data.refreshToken,
          access: res.data.accessToken,
        },
      },
    });
  } catch (err) {
    console.error(err.response || err);
    if (err.response) {
      throw err.response.data.message ?? err.response.data[0].message ?? err.response.statusText;
    }
  }
};

export const fetchNewAccessToken = (auth: any, dispatch: any) => {
  axios
    .post(BACKEND_URL + '/auth/token', null, {
      headers: { authorization: `Bearer ${auth.tokens.refresh}` },
    })
    .then((res) => {
      dispatch({ type: UPDATE_ACCESS_TOKEN, payload: res.data.token });
    })
    .catch((err) => {
      if (err.response.status === 403 || err.response.status === 401) {
        dispatch({ type: LOGOUT });
      }
    });
};

export const fetchUser = (auth: any, dispatch: any) => {
  if (!auth.tokens.access) return;
  axios
    .get(BACKEND_URL + '/auth/me', {
      headers: { authorization: `Bearer ${auth.tokens.access}` },
    })
    .then((res) => {
      dispatch({ type: LOAD_USER, payload: res.data });
    })
    .catch((err) => {
      if (err.response.status === 403 || err.response.status === 401) {
        dispatch({ type: LOGOUT });
      }
    });
};
