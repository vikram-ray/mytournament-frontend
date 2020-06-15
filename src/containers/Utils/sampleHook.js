import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '../../components/SnackBar/SnakBar';
import Loader from '../../components/Loader/Loader'


export default function SignIn() {

  const [user, setUser] = useState({username:'',password:''});
  const [buttonActive, setButtonActive] = useState(true)


  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(AuthLogin(user.username, user.password));
    setButtonActive(false);
  }

  const loading = useSelector(state=>state.auth.loading);
  const error = useSelector(state=>state.auth.error);
  const errorMessage = useSelector(state=>state.auth.errorMessage);
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);


  return (<div>
    <Snackbar variant='error' message={'error message'} />
    <Snackbar variant='success' message='Login Successful.' />
  </div>)
}
