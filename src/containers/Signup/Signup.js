import React, {useState, Fragment} from 'react';
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
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify'
import Breadcrum from '../../components/Breadcrum/Breadcrum';
import {filterUsername} from '../Utils/StringUtils';
import {  useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import Copyright from '../../components/Copyright/Copyright';
import Axios from 'axios';

import {AuthSignup, AuthFail} from '../../store/actions/Auth/Auth';

const TIMER = 90

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [mobileButtonDisable, setMobileButtonDisable] = useState(false);
  const [otp, setOtp] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(TIMER);
  const [otpSent, setOtpSent] = useState(false);
  const [otpButtonDisable, setOtpButtonDisable] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [resend, setResend] = useState(false);

  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);
  const loading = useSelector(state=>state.auth.loading);

  const handleChange = (event, type) => {
    const value = event.target.value
    switch (type) {
      case 'firstName': setFirstName(value.substring(0,20)); break;
      case 'lastName': setLastName(value.substring(0,20)); break;
      case 'mobile': setMobile(value.substring(0,10)); break;
      case 'otp': setOtp(value.substring(0,4)); break;
      case 'password': setPassword(value.substring(0,30)); break;
      default:
        console.log('error occured in signup');
    }
  }
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(otp.length!==4){
      toast.error('Please enter 4 digit OTP');
      return;
    }
    dispatch(AuthSignup({
      name: firstName + ' ' + lastName,
      mobile,
      otp,
      password,
      username
    }, props));
  }

  const isAvailable = (username) => {
    setUsername(filterUsername(username.substring(0,20)));
    if(username.length>2){
      Axios.get('/api/users/query_username/?username='+username).then((res)=>{
        setUsernameAvailable(false);
      }).catch((err)=>{
        setUsernameAvailable(true);
      })
    }else{
      setUsernameAvailable(false);
    }
  }

  const startTimer = (num) =>{
    setTimer(num);
    if(num>0){
      setTimeout(()=>{
        startTimer(num-1);
      },1000);
    }else{
      setOtpButtonDisable(false);
      setMobileButtonDisable(false);
      setTimer(TIMER);
    }
}

  const sendOtp = (e,num) => {
    e.preventDefault();
    setResend(true);
    startTimer(TIMER);
    setMobileButtonDisable(true);
    setOtpButtonDisable(true);
    setOtpSent(true);
    let data = {
      mobile: num
    }
    if(resend){data['resend'] = true;}
    setResend(true);
    Axios.post('/api/users/signup_otp/',data).then((res)=>{
      setSuccess(res.data.message);
      toast.success(res.data.message);
    }).catch((error)=>{
      dispatch(AuthFail());
      toast.error(error.response.data.message);
      setOtpSent(false);
      setOtpButtonDisable(false);
      setMobileButtonDisable(false);
      setTimer(TIMER);
    });
  }

  let usernamehelperText = '';
   if(username.length>0 && username.length<3){
    usernamehelperText = 'Username must be more than 2 character';
  }else if(username.length>2 && !usernameAvailable){
    usernamehelperText = 'This username is not availabe';
  }

  if(loading){return <Loader />}
  if(isAuthenticated) {props.history.push('/'); }

  let extraFields = null;
  let signupButton = null;
  if(otpSent) {
    signupButton = <Fragment>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={password.length<8 || username.length<3 || mobile.length<10 || firstName.length<1 || lastName.length<1 || otp.length<4 || !usernameAvailable}
          >
            Sign Up
          </Button>
    </Fragment>
    extraFields = <Fragment>
                <Grid item xs={8}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                error={otp.length>0 && otp.length<4}
                helperText={ otp.length >1 && otp.length<4?"Please enter 4 digit OTP":""}
                type='number'
                value={otp}
                onChange={(e)=>handleChange(e,'otp')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e)=>handleChange(e,'firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(e)=>handleChange(e,'lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                error={!!usernamehelperText}
                helperText={usernamehelperText}
                value={username}
                onChange={(e)=>isAvailable(e.target.value)}
              />
            </Grid>
            {usernameAvailable?<Typography color="primary" style={{marginLeft:'1rem'}}>This username is available.</Typography>:null}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={password.length>0 && password.length<8}
                helperText="Password must be more than 7 character"
                autoComplete="current-password"
                value={password}
                onChange={(e)=>handleChange(e,'password')}
              />
            </Grid>

  </Fragment>
}  

  return (
    <Container component="main" maxWidth="xs">
      <Breadcrum first={{text:"Home",to:"/"}} third={{text:'Signup'}}/>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={e => { e.preventDefault(); }} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoFocus
                id="mobile"
                label="Mobile"
                name="mobile"
                autoComplete="mobile"
                error={mobile.length>0 && mobile.length<10}
                helperText={ mobile.length >1 && mobile.length<10?"Please enter a valid mobile number":""}
                type='number'
                value={mobile}
                disabled={mobileButtonDisable}
                onChange={(e)=>handleChange(e,'mobile')}
              />
            </Grid>
            {otpSent?<Typography color="primary" style={{marginLeft:'1rem'}}>{success} in {timer} seconds.</Typography>:null}
            <Grid item xs={4} style={{margin:'auto'}}>
              <Button disabled={otpButtonDisable || mobile.length!==10} onClick={(e)=>sendOtp(e,mobile)} variant="contained" style={{fontSize:'0.8rem'}} color="primary">{resend?"RE":""}SEND OTP</Button>
            </Grid>
              {extraFields}
          </Grid>
            {signupButton}
          <Grid container justify="center">
            <Grid item>
              <NavLink to='/login'>
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          By Signing up you agree to our <NavLink to='/tnc'>T&C</NavLink>.<br/>
          Please read <NavLink to='/privacy-policy'>privacy policy</NavLink>.
        </Typography>

        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignUp);