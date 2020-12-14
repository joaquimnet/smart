import React, { useState } from 'react';
import Helmet from 'react-helmet';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Alert from '@material-ui/lab/Alert';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useHistory, Redirect } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../services/auth.service';

interface Props {
  afterLoginRedirect: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '1rem',
  },
  control: {
    margin: '0.5rem 0',
  },
});

export const Login: React.FC<Props> = ({ afterLoginRedirect }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const [error, setError] = useState<null | string>(null);
  const [loginForm, setLoginForm] = useImmer({ email: '', password: '' });

  const navigate = (where: string) => () => history.push(where);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    login(loginForm, dispatch).catch((error) => {
      setError(error);
    });
  };

  const handleChange = (type: 'email' | 'password') => (e: any) =>
    setLoginForm((draft) => {
      draft[type] = (e.target as any).value;
    });

  if (user) {
    return <Redirect to={afterLoginRedirect} />;
  }

  return (
    <>
      {head()}
      <Container className={classes.root}>
        <Card>
          <Container>
            <CardContent>
              <Typography variant='h5' component='h2' gutterBottom>
                Login
              </Typography>
              <form onSubmit={onSubmit}>
                <FormControl className={classes.control} fullWidth>
                  <InputLabel htmlFor='email'>Email address</InputLabel>
                  <Input
                    onChange={handleChange('email')}
                    id='email'
                    type='email'
                    aria-describedby='email-text'
                    autoFocus
                    required
                  />
                  <FormHelperText id='email-text'>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl className={classes.control} fullWidth>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <Input
                    id='password'
                    onChange={handleChange('password')}
                    type='password'
                    aria-describedby='password-text'
                    required
                    color='primary'
                  />
                  <FormHelperText id='password-text'>
                    The password you used to sign up.
                  </FormHelperText>
                </FormControl>
                <FormControl className={classes.control}>
                  <Button onClick={onSubmit} variant='contained' color='primary' type='submit'>
                    LOGIN
                  </Button>
                  <input type='submit' hidden aria-hidden />
                </FormControl>
              </form>
              {error && <Alert severity='error'>{error}</Alert>}
            </CardContent>
            <CardActions>
              <Button component='a' onClick={navigate('/signup')} size='small'>
                Sign Up
              </Button>
            </CardActions>
          </Container>
        </Card>
      </Container>
    </>
  );
};

function head() {
  return (
    <Helmet>
      <title>SMART - Login</title>
    </Helmet>
  );
}
