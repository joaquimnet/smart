import {
  Button,
  Card,
  CardContent,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import React from 'react';

import heroImage from '../assets/gabriel-sollmann-Y7d265_7i08-unsplash.jpg';
import { useNavigation } from '../hooks/useNavigation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hero: {
      width: '100%',
      minHeight: '40vh',
      padding: theme.spacing(2),
      display: 'flex',
      flexFlow: 'column wrap',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${heroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
    },
    title: {
      fontSize: '3rem',
      marginTop: '0',
      marginBottom: theme.spacing(2),
      textDecoration: 'underline',
      textDecorationThickness: '0.5rem',
      textDecorationColor: '#3f51b5',
      textShadow: '2px 2px 2px black, -2px -2px 2px rgba(0, 0, 0, 0.3)',
    },
    text: {
      background: 'white',
      borderRadius: '0.5rem',
      padding: '0.25rem',
      marginBottom: theme.spacing(2),
    },
    content: {
      marginTop: theme.spacing(2),
    },
    card: {
      minHeight: '16rem',
    },
  }),
);

interface Props {}

export const Home: React.FC<Props> = () => {
  const classes = useStyles();
  const { makeGo } = useNavigation();

  return (
    <>
      <Grid container>
        <Grid xs={12} item>
          <header className={classes.hero}>
            <Typography variant='h1' align='center' className={classes.title}>
              Welcome To Smart
            </Typography>
            <Typography className={classes.text} align='center'>
              In today's society the secret to staying productive is organizing your information.
              We'll help you with that.
            </Typography>
            <Button variant='contained' color='primary' size='large' onClick={makeGo('/login')}>
              Get Started
            </Button>
          </header>
        </Grid>
      </Grid>
      <Container className={classes.content}>
        <Grid xs={12} container spacing={2}>
          <Grid xs={12} sm={4} item>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h4' align='center'>
                  Collect
                </Typography>
                <Divider />
                <Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Send />
                      </ListItemIcon>
                      <ListItemText primary='Write, record, or gather any and everything that has your attention.' />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Send />
                      </ListItemIcon>
                      <ListItemText primary='Park reminders of your categorized content in appropriate places.' />
                    </ListItem>
                  </List>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={4} item>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h4' align='center'>
                  Review
                </Typography>
                <Divider />
                <Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Send />
                      </ListItemIcon>
                      <ListItemText primary='Update and review all pertinent system contents to regain control and focus.' />
                    </ListItem>
                  </List>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={4} item>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h4' align='center'>
                  Act
                </Typography>
                <Divider />
                <Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Send />
                      </ListItemIcon>
                      <ListItemText primary='Use a trusted system to make action decisions with confidence and clarity.' />
                    </ListItem>
                  </List>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
