import axios from 'axios';

import { BACKEND_URL } from '../config';
// import { LOAD_USER, LOGOUT, UPDATE_ACCESS_TOKEN, LOGIN } from '../reducers/actions';

export const fetchProjects = async (key: string, auth: any, dispatch?: any) => {
  if (!auth.tokens.access) return;
  let res;
  try {
    res = await axios.get(BACKEND_URL + '/project', {
      headers: { authorization: `Bearer ${auth.tokens.access}` },
    });
    return res.data;
  } catch (err) {
    throw err.response ?? err;
  }
};

export const fetchProject = async (key: string, auth: any, id: any) => {
  if (!auth.tokens.access) return;
  let res;
  try {
    res = await axios.get(BACKEND_URL + '/project/' + id, {
      headers: { authorization: `Bearer ${auth.tokens.access}` },
    });
    return res.data;
  } catch (err) {
    throw err.response ?? err;
  }
};
