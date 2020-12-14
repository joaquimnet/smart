import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewAccessToken, fetchUser } from '../services/auth.service';

export const UserFetcher = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => fetchNewAccessToken(auth, dispatch), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => fetchUser(auth, dispatch), [auth.tokens.access]);

  return null;
};
