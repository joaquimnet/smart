import React from 'react';
import Helmet from 'react-helmet';
import {
  Chip,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { ViewCarousel } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchProjects } from '../../services/project.service';
import { useQuery } from 'react-query';

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
});

interface IProject {
  _id: string;
  title: string;
  tags: string[];
}

export const ProjectList: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useSelector((state: any) => state.auth);

  const { data: projects } = useQuery<IProject[]>(['projects', auth], fetchProjects);

  const navigate = (where: string) => () => history.push(where);

  // if (!auth.user) {
  //   return <Redirect to='/login' />;
  // }

  const ProjectItem = (project: IProject) => (
    <ListItem
      key={project._id}
      className={classes.item}
      onClick={navigate(`/dashboard/projects/${project._id}`)}
      button
    >
      <ListItemIcon>
        <ViewCarousel />
      </ListItemIcon>
      <ListItemText primary={project.title} />
      <ListItemSecondaryAction>
        {project.tags.map((tag) => (
          <Chip key={project._id + tag} size='small' label={`#${tag}`} className={classes.tag} />
        ))}
      </ListItemSecondaryAction>
    </ListItem>
  );

  return (
    <>
      {head()}
      <Container className={classes.root}>
        <h1>Projects</h1>
        <List component='nav' aria-label='main mailbox folders'>
          {projects && projects.map(ProjectItem)}
        </List>
      </Container>
    </>
  );
};

function head() {
  return (
    <Helmet>
      <title>SMART - Projects</title>
    </Helmet>
  );
}
