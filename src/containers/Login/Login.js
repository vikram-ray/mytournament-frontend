import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {withRouter} from 'react-router-dom';

import Loader from '../../components/Loader/Loader'
import Copyright from '../../components/Copyright/Copyright'

import { AuthLogin} from '../../store/actions/Auth/Auth';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function SignIn(props) {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeHandler = (event,type) => {
    if(type === 'username'){
      setUsername(event.target.value.substring(0,10));
    }else{
      setPassword(event.target.value);
    }
  }

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(AuthLogin(username, password, props));
  }

  const loading = useSelector(state=>state.auth.loading);
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);

  if(isAuthenticated) { props.history.push('/') }

  let usernamehelperText = '';
  let passwordhelperText = '';
  if(password.length>0 && password.length<8){
    passwordhelperText = 'Password must be more than 7 character';
  }
  if(username.length>0 && username.length<3){
    usernamehelperText = 'Username must be more than 2 character';
  }

  let RenderItem = <Loader />
  if (!loading){
      RenderItem = (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={e => { e.preventDefault(); }} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="mobile"
                label="Mobile"
                name="mobile"
                autoComplete="mobile"
                onChange={(e) => changeHandler(e,'username')}
                value={username}
                type='number'
                helperText={usernamehelperText}
                error={!!usernamehelperText}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => changeHandler(e,'password')}
                value={password}
                helperText={passwordhelperText}
                error={!!passwordhelperText}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={username.length<3 || password.length<8}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <NavLink to="/forgot-password" variant="body2">
                    Forgot password?
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      );
  }  

  return <div>
      {RenderItem}
  </div>
}
export default withRouter(SignIn);