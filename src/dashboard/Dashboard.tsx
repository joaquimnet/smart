import React from 'react';
import Helmet from 'react-helmet';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { fetchProjects } from '../services/project.service';
// import { useQuery } from 'react-query';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

interface Props {}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '1rem',
    flexFlow: 'column wrap',
  },
  item: {
    borderBottom: '1px solid rgba(0,0,0,0.2)',
  },
  tag: {
    margin: '0.25rem',
  },
  card: {
    width: '100%',
    // margin: '1rem',
  },
});

// interface IProject {
//   _id: string;
//   title: string;
//   tags: string[];
// }

export const Dashboard: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useSelector((state: any) => state.auth);

  // const { data: projects } = useQuery<IProject[]>(['projects', auth], fetchProjects);

  const navigate = (where: string) => () => history.push(where);

  if (!auth.user) {
    return <Redirect to='/login' />;
  }

  return (
    <>
      {head()}
      <Container className={classes.root}>
        <h1>This is the dashboard</h1>
        <Grid container direction='row' justify='center' spacing={2}>
          <Grid item xs={3}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h5' component='h2'>
                  Projects
                </Typography>
                <Typography variant='body2' component='p'>
                  Organize your goals.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={navigate('/dashboard/projects')}
                  size='small'
                  color='primary'
                  variant='contained'
                >
                  Go
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h5' component='h2'>
                  To Dos
                </Typography>
                <Typography variant='body2' component='p'>
                  Do stuff.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={navigate('/dashboard/todos')}
                  size='small'
                  color='primary'
                  variant='contained'
                >
                  Go
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

function head() {
  return (
    <Helmet>
      <title>SMART - Dashboard</title>
    </Helmet>
  );
}
