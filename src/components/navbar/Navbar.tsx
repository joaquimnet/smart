import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const Navbar: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const user = useSelector((state: any) => state.auth.user);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = (where: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setAnchorEl(null);
    history.push(where);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant='h6' className={classes.title}>
            <Link href='/#/' onClick={navigate('/')} color='inherit' style={{ cursor: 'pointer' }}>
              SMART
            </Link>
          </Typography>
          {user && (
            <div>
              <Button color='secondary' variant='contained' onClick={navigate('/dashboard')}>Dashboard</Button>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={navigate('/profile')}>Profile</MenuItem>
                <MenuItem onClick={navigate('/account')}>My account</MenuItem>
                <MenuItem onClick={navigate('/logout')} style={{ color: '#961010' }}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
          {!user && (
            <Button onClick={navigate('/login')} color='inherit'>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
