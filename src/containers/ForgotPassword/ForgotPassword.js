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
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify'

import {  useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import Copyright from '../../components/Copyright/Copyright';
import Axios from 'axios';

import {AuthStart, AuthFail, EndProfile, AuthLogin } from '../../store/actions/Auth/Auth';

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

function ForgotPassword(props) {
  const classes = useStyles();

  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [mobileButtonDisable, setMobileButtonDisable] = useState(false);
  const [otp, setOtp] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(TIMER);
  const [otpSent, setOtpSent] = useState(false);
  const [otpButtonDisable, setOtpButtonDisable] = useState(false);
  const [resend, setResend] = useState(false);

  const loading = useSelector(state=>state.auth.loading);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(otp.length!==4){
      toast.error('Please enter 4 digit OTP');
      return;
    }
    let data = {
      mobile,
      newPassword: password,
      otp
    }
    dispatch(AuthStart());
    Axios.post('/api/users/set_new_password/',data).then((respose)=>{
      toast.success(respose.data.message);
      dispatch(AuthLogin(mobile, password, props));
    }).catch((error)=>{
      toast.error(error.response.data.message);
      dispatch(EndProfile());
    })
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
      mobile: num,
    }
    if(resend){data['resend'] = true;}
    setResend(true);
    Axios.post('/api/users/forgot_password/',data).then((res)=>{
      setSuccess(res.data.message);
      toast.success(res.data.message);
    }).catch((error)=>{
      dispatch(AuthFail(error.response.data.message));
      toast.error(error.response.data.message);
      setOtpSent(false);
      setOtpButtonDisable(false);
      setMobileButtonDisable(false);
      setTimer(TIMER);
    });
  }

  if(loading){return <Loader />}
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
            disabled={password.length<8 || mobile.length<10 || otp.length<4 }
          >
            Save
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
                onChange={(e)=>setOtp(e.target.value.substring(0,4))}
              />
            </Grid>
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
                onChange={(e)=>setPassword(e.target.value.substring(0,25))}
              />
            </Grid>

  </Fragment>
}  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
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
                onChange={(e)=>setMobile(e.target.value.substring(0,10))}
              />
            </Grid>
            {otpSent?<Typography color="primary" style={{marginLeft:'1rem'}}>{success} in {timer} seconds.</Typography>:null}
            <Grid item xs={4} style={{margin:'auto'}}>
              <Button disabled={otpButtonDisable || mobile.length!==10} onClick={(e)=>sendOtp(e,mobile)} variant="contained" style={{fontSize:'0.8rem'}} color="primary">{resend?"RE":""}SEND OTP</Button>
            </Grid>
              {extraFields}
          </Grid>
            {signupButton}
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(ForgotPassword);