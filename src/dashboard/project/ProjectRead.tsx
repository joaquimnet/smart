import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  // CardActions,
  Container,
  makeStyles,
  createStyles,
  // Button,
  Grid,
  List,
  ListItem,
  Fab,
  Theme,
} from '@material-ui/core';

import { fetchProject } from '../../services/project.service';
import { Markdown } from '../../components/markdown/Markdown';
import AddIcon from '@material-ui/icons/Add';
import { ProjectEditorModal } from './ProjectEdit';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: '1rem',
    },
    button: {
      position: 'fixed',
      right: theme.spacing(2),
      bottom: theme.spacing(2),
      margin: theme.spacing(1),
    },
    epic: {
      borderLeft: '5px solid purple',
    },
    note: {
      borderLeft: '5px solid green',
    },
    project: {
      borderLeft: '5px solid #2462be',
    },
    todo: {
      borderLeft: '5px solid #9b850a',
    },
  }),
);

export const ProjectRead: React.FC<Props> = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const auth = useSelector((state: any) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: project, isLoading, error } = useQuery(['project', auth, id], fetchProject);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Oh no, we couldn&apos;t find that project.</h2>;
  }

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant='h5' component='h2'>
                    SPECIFIC
                  </Typography>
                  <Typography variant='body2' component='div'>
                    <Markdown>{project.specific}</Markdown>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant='h5' component='h2'>
                    MEASURABLE
                  </Typography>
                  <Typography variant='body2' component='div'>
                    <Markdown>{project.measurable}</Markdown>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant='h5' component='h2'>
                    ACHIEVABLE
                  </Typography>
                  <Typography variant='body2' component='div'>
                    <Markdown>{project.achievable}</Markdown>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant='h5' component='h2'>
                    REALISTIC
                  </Typography>
                  <Typography variant='body2' component='div'>
                    <Markdown>{project.realistic}</Markdown>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant='h5' component='h2'>
                    TIMELY
                  </Typography>
                  <Typography variant='body2' component='div'>
                    <Markdown>{project.time}</Markdown>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant='h5' component='h2'>
                Connections
              </Typography>
              <List>
                {project.connections.epics.map((e: any) => (
                  <ListItem key={e._id} button className={classes.epic}>
                    {e.title}
                  </ListItem>
                ))}
                {project.connections.projects.map((e: any) => (
                  <ListItem key={e._id} button className={classes.project}>
                    {e.title}
                  </ListItem>
                ))}
                {project.connections.notes.map((e: any) => (
                  <ListItem key={e._id} button className={classes.note}>
                    {e.title}
                  </ListItem>
                ))}
                {project.connections.todos.map((e: any) => (
                  <ListItem key={e._id} button className={classes.todo}>
                    {e.title}
                  </ListItem>
                ))}
              </List>
            </CardContent>
            {/* <CardActions>
              <Button size='small' onClick={() => console.log(project)}>
                Learn More
              </Button>
            </CardActions> */}
          </Card>
        </Grid>
      </Grid>
      <Fab
        variant='extended'
        color='primary'
        aria-label='add'
        className={classes.button}
        onClick={() => setIsModalOpen(true)}
      >
        <AddIcon />
        New
      </Fab>
      <ProjectEditorModal isOpen={isModalOpen} close={() => setIsModalOpen(false)} />
    </Container>
  );
};
