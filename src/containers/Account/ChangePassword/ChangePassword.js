import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Loader from '../../../components/Loader/Loader';
import {useDispatch, useSelector} from 'react-redux';
import Paper from '../../../components/Paper/Paper';
import Fab from '../../../components/Fab/Fab';
import { toast } from 'react-toastify';
import Breadcrum from '../../../components/Breadcrum/Breadcrum';
import {ChangePassword} from '../../../store/actions/Auth/Auth';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    width: "90%"
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userId = useSelector(state=>state.auth.id);
  const loading  = useSelector(state=>state.auth.loading);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const handleChange = () => {
    if(newPassword1.length<8 || newPassword2.length<8 || oldPassword.length<8) {toast.error('Password must be 8 characters')}
    else if(newPassword1 !== newPassword2) {toast.error('Your new password is not same in both fields')}
    else if(newPassword1 === oldPassword) {toast.error('Your old and new password cannot be same')}
    else {
        const data = {
            'newPassword': newPassword1,
            'oldPassword': oldPassword
        }
        dispatch(ChangePassword(userId, data));
    }
  }

  if(loading) {return <Loader />}

  return (
    <div className={classes.root}>
    <Fab addTo='/mytournament/create' />
    <Breadcrum first={{text:"Home",to:"/"}} third={{text:"Change Password"}}/>
    <CssBaseline />
    <Paper>
      <Grid container spacing={1} style={{marginBottom: "3px"}}>
        <Grid item sm={6}>
          <TextField
            label="Old password"
            id="oldPassword"
            value={oldPassword || ''}
            className={classes.textField}
            onChange={e=>setOldPassword(e.target.value.substring(0,25))}
            type='password'
            margin="normal"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            label="New password"
            id="newPassword"
            value={newPassword1 || ''}
            className={classes.textField}
            onChange={e=>setNewPassword1(e.target.value.substring(0,25))}
            type='password'
            margin="normal"
          />
        </Grid>        
        <Grid item sm={6}>
          <TextField
            label="New password again"
            id="newPassword2"
            value={newPassword2 || ''}
            className={classes.textField}
            onChange={e=>setNewPassword2(e.target.value.substring(0,25))}
            type='text'
            margin="normal"
          />
        </Grid>
      </Grid>
      <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={handleChange}
          startIcon={<SaveIcon />}
        >
          Save
      </Button>

    </Paper>

    </div>
  );
}
