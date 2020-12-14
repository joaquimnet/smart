import { Container } from '@material-ui/core';
import React from 'react';

interface Props {
  children: NonNullable<React.ReactNode>;
}

export const Page: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};
