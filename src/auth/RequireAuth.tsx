import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
  children: NonNullable<React.ReactNode>;
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
  const { user } = useSelector((state: any) => state.auth);

  if (!user) return null;
  return <>{children}</>;
};
