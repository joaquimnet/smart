import React from 'react';
import {
  Container,
  createStyles,
  Grid,
  List,
  ListItem,
  makeStyles,
  Theme,
  ListItemSecondaryAction,
  Chip,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { IProject } from '../services/project.service';
import { useNavigation } from '../hooks/useNavigation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '1rem',
      flexFlow: 'column wrap',
    },
    item: { borderBottom: '1px solid rgba(0,0,0,0.2)' },
    tag: { margin: '0.25rem' },
    button: {
      position: 'fixed',
      right: theme.spacing(2),
      bottom: theme.spacing(2),
      margin: theme.spacing(1),
    },
    epic: { borderLeft: '5px solid purple', margin: '0.125rem' },
    note: { borderLeft: '5px solid green' },
    project: { borderLeft: '5px solid #2462be' },
    todo: { borderLeft: '5px solid #9b850a' },
    cardMargin: { marginBottom: theme.spacing(1) },
  }),
);

interface Props {
  projects: IProject[];
}

export const DashboardLayout: React.FC<Props> = ({ projects }) => {
  const { makeGo } = useNavigation();
  const classes = useStyles();
  const auth = useSelector((state: any) => state.auth);

  if (!auth.user) {
    return <Redirect to='/login' />;
  }

  return (
    <>
      <Container className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.cardMargin}>
              <CardContent>
                <Typography variant='h5' component='h2'>
                  Epics
                </Typography>
                <Chip size='medium' label='Beep boop' className={classes.epic} />
                <Chip
                  size='medium'
                  label='Blap bnolo Blap bnolo Blap bnolo'
                  className={classes.epic}
                />
                <Chip size='medium' label='Run a mile daily' className={classes.epic} />
                <Chip size='medium' label='Beep boop' className={classes.epic} />
                <Chip
                  size='medium'
                  label='Blap bnolo Blap bnolo Blap bnolo'
                  className={classes.epic}
                />
                <Chip size='medium' label='Run a mile daily' className={classes.epic} />
                <Chip size='medium' label='Beep boop' className={classes.epic} />
                <Chip
                  size='medium'
                  label='Blap bnolo Blap bnolo Blap bnolo'
                  className={classes.epic}
                />
                <Chip size='medium' label='Run a mile daily' className={classes.epic} />
                <Chip size='medium' label='Beep boop' className={classes.epic} />
                <Chip
                  size='medium'
                  label='Blap bnolo Blap bnolo Blap bnolo'
                  className={classes.epic}
                />
                <Chip size='medium' label='Run a mile daily' className={classes.epic} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant='h5' component='h2'>
                      Projects
                    </Typography>
                    <List>
                      {projects &&
                        projects.map((p) => (
                          <ListItem
                            key={p._id}
                            button
                            onClick={makeGo(`/dashboard/projects/${p._id}`)}
                            className={classes.project}
                          >
                            {p.title}
                            <ListItemSecondaryAction>
                              {p.tags.map((tag) => (
                                <Chip
                                  key={p._id + tag}
                                  size='small'
                                  label={`#${tag}`}
                                  className={classes.tag}
                                />
                              ))}
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.cardMargin}>
              <CardContent>
                <Typography variant='h5' component='h2'>
                  Side Thing
                </Typography>
                <List>
                  <ListItem button className={classes.note}>
                    Epic!
                  </ListItem>
                  <ListItem button className={classes.note}>
                    project!
                  </ListItem>
                  <ListItem button className={classes.note}>
                    note!
                  </ListItem>
                  <ListItem button className={classes.note}>
                    todo!
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            <Card className={classes.cardMargin}>
              <CardContent>
                <Typography variant='h5' component='h2'>
                  Side Thing
                </Typography>
                <List>
                  <ListItem button className={classes.todo}>
                    Epic!
                  </ListItem>
                  <ListItem button className={classes.todo}>
                    project!
                  </ListItem>
                  <ListItem button className={classes.todo}>
                    note!
                  </ListItem>
                  <ListItem button className={classes.todo}>
                    todo!
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
