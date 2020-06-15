import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader/Loader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Paper from '../../components/Paper/Paper';
import Fab from '../../components/Fab/Fab';
import Checkbox from '@material-ui/core/Checkbox';
import Breadcrum from '../../components/Breadcrum/Breadcrum';
import CssBaseline from '@material-ui/core/CssBaseline';

import {getLocalTime} from '../Utils/TimeUtils';
import {filterUsername} from '../Utils/StringUtils';
import {GetProfile, UpdateProfile} from '../../store/actions/Auth/Auth';

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
  const user = useSelector(state=>state.auth.user);
  const isAuthenticated  = useSelector(state=>state.auth.isAuthenticated);
  const loading  = useSelector(state=>state.auth.loading);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [joined, setjoined] = useState('');
  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [about, setAbout] = useState('');
  const [lastLogin, setLastLogin] = useState('');

  if(user && !mobile) {
    setName(user.name);
    setMobile(user.mobile);
    setEmail(user.email);
    setjoined(getLocalTime(user.created_at));
    setUsername(user.username);
    setLastLogin(getLocalTime(user.last_login));
    setAbout(user.about);
  }

  const isAvailable = (username) => {
    let uName = filterUsername(username.substring(0,20));
    setUsername(uName);
    if(username.length>2){
      Axios.get('/api/users/query_username/?username='+uName).then((res)=>{
        setUsernameAvailable(false);
      }).catch((err)=>{
        setUsernameAvailable(true);
      })
    }else{
      setUsernameAvailable(false);
    }
  }

  let usernamehelperText = '';
   if(username.length>0 && username.length<3){
    usernamehelperText = 'Username must be more than 2 character';
  }else if(username.length>2 && !usernameAvailable){
    usernamehelperText = 'This username is not availabe';
  }

  const handleUpdate = () =>{
    const data = {}
    if(user) {
      if(username !== user.username) {data.username=username};
      if(about !== user.about) {data.about=about};
      if(email !== user.email) {data.email=email};
      if(name !== user.name) {data.name=name};
      if(Object.keys(data).length>0) {
        dispatch(UpdateProfile(userId, data))
      }  
    }
  }

  useEffect(()=>{
    if(isAuthenticated && userId) {
      dispatch(GetProfile(userId));
    }
  },[])

  if(loading) {return <Loader />}

  return (
    <div className={classes.root}>
    <Breadcrum first={{text:"Home",to:"/"}} third={{text:'Account'}}/>
    <CssBaseline />
    <Fab addTo='/mytournament/create' />
    <Paper>
      <Grid container spacing={1} style={{marginBottom: "3px"}}>
        <Grid item xs={12}>
          <Typography color='primary' align='center' >
            Last Login: {lastLogin}
          </Typography>
          <Divider variant='middle' />
          <Typography color='primary' align='center' >
            Joined: {joined}
          </Typography>
          <Typography align='right'>sms credit: {user.extra_fields.sms_credit}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="standard-full-width"
            label="Full Name"
            required
            style={{ margin: 8 }}
            onChange={e =>setName(e.target.value.substring(0,30))}
            placeholder="John Doe"
            fullWidth
            value={name || ''}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item sm={6}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
        <TextField
            label="Username"
            id="username"
            required
            error={!!usernamehelperText}
            value={username || ''}
            onChange={(e)=>isAvailable(e.target.value)}
            className={classes.textField}
            helperText={usernamehelperText}
            margin="normal"
            style={{width:'80%'}}
          />
          <Checkbox
            checked={usernameAvailable}
            color='primary'
            size="small"
            value="small"
            inputProps={{ 'aria-label': 'checkbox with small size' }}
          />
        </Grid>
        </Grid>
        <Grid item sm={6}>
          <TextField
            label="Email"
            id="email"
            type="email"
            value={email || ''}
            className={classes.textField}
            onChange={e =>setEmail(e.target.value.substring(0,100))}
            margin="normal"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            label="Mobile"
            id="mobile"
            value={mobile || ''}
            className={classes.textField}
            disabled
            type='number'
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
              id="about"
              label="About"
              multiline
              fullWidth
              value={about||""}
              onChange={(e)=>setAbout(e.target.value.substring(0,1000))}
              rows={7}
              placeholder={`About ${username}`}
              variant="outlined"
            />             
          </Grid>
      </Grid>
      <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={handleUpdate}
          startIcon={<SaveIcon />}
          disabled={!(name && username && usernamehelperText.length===0 )}
        >
          Save
      </Button>

    </Paper>

    </div>
  );
}
