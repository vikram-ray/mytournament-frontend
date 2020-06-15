import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {  useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Badge from '@material-ui/core/Badge';

import Notification from '../Toolbar/Notification/Notification';
import NotificationModal from './Notifications/Notifications';
import RightMenu from '../Toolbar/RightMenu/RightMenu';

import useStyles from './MUIStyle/MUIStyle'
import SidedrawerItems from './SidedrawerItems/SidedrawerItems';

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [notiOpen, setNotiOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const notiToggler = () => {setNotiOpen(!notiOpen)}

  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);
  const user = useSelector(state=>state.auth.user);
  let notifications = [];
  let NotificationIcon = <IconButton color="inherit" onClick={notiToggler} ><Notification /></IconButton>

  if(user && isAuthenticated) {
    notifications = user.notifications;
    NotificationIcon = <IconButton color="inherit" onClick={notiToggler} ><Badge badgeContent={user.notifications.length} color="secondary"><Notification /></Badge></IconButton>
  }

  const isMobile = window.screen.width < 600
  const drawer = (
      <div>
      <div className={classes.toolbar} />
      <Divider />
        <SidedrawerItems onclick={isMobile?handleDrawerToggle:null} />
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NotificationModal notification={notifications} modalToggler={notiToggler} isOpen={notiOpen} />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid justify="space-between" alignItems='center' container direction='row'>
            <NavLink to='/'>
              <Typography variant="h6" noWrap>
                  MyTournament
              </Typography>
            </NavLink>
            <div style={{'display':'flex', 'alignItems':'center'}} >
                {NotificationIcon}
                <RightMenu />
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, 
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            {props.children}
      </main>
    </div>
  );
}


export default ResponsiveDrawer;
