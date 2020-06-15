import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {Button} from '@material-ui/core'
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({isOpen, modalToggler, notification}) {
  const classes = useStyles(); 
  let mynotification = [...notification]
  mynotification.reverse()
  const MyListItem = ({noti}) => {
    const noti_arr = noti.split('::')
    let primary = `${noti_arr[0]}, ${moment.unix(Number(noti_arr[1])).fromNow()}`
    let secondary = noti_arr[2]
    return  <ListItemText primary={primary} secondary={secondary} />
  }

  return (
    <div>
      <Dialog fullScreen open={isOpen} onClose={modalToggler} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={modalToggler} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Notifications
            </Typography>
            <Button autoFocus color="inherit" onClick={modalToggler}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
            {mynotification.length === 0? 'No notification':null}
            {mynotification.map((noti,index)=>(<React.Fragment key={index} >
                                                    <ListItem button>
                                                    <MyListItem noti={noti}/>
                                                    </ListItem>
                                                    <Divider />
                                            </React.Fragment>))}
        </List>
      </Dialog>
    </div>
  );
}
