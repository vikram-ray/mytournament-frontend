import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '../../components/Fab/Fab';
import { toast } from 'react-toastify';

import Loader from '../../components/Loader/Loader';
import {withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Axios from 'axios';
import {getLocalTime }from '../../containers/Utils/TimeUtils';
import StarsIcon from '@material-ui/icons/Stars';
import Tooltip from '@material-ui/core/Tooltip';
import Breadcrum from '../../components/Breadcrum/Breadcrum';
import CssBaseline from '@material-ui/core/CssBaseline';

import {TournamentStart, TournamentEnd} from '../../store/actions/Tournament/Tournament'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function UserDetails(props) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);

    const loading = useSelector(state=>state.tournament.loading);

    useEffect(()=>{
        const userId = props.match.params.id;
        if(!user) {  
            Axios.get('/api/users/'+userId+'/').then((response)=>{
                dispatch(TournamentStart());
                setUser(response.data.data);
                dispatch(TournamentEnd());
            }).catch((error)=>{
                try{dispatch(TournamentEnd()); toast.error(error.response.data.message)}
                catch(error){dispatch(TournamentEnd()); toast.error('Something went wrong')}
            })
        }
    },[]);

    if(loading|| !user){return <Loader />}
    return (
        <div className={classes.root}>
        <Breadcrum first={{text:"Home",to:"/"}} second={{text:"Search",to:"/search"}} third={{text:'User'}}/>
        <CssBaseline />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                  <Typography variant='h4' >
                    {user.is_partner?<Tooltip title="MyTournament Partner"><StarsIcon/></Tooltip>:null}
                    {user.username}
                    {user.is_partner?<Tooltip title="MyTournament Partner"><StarsIcon/></Tooltip>:null}
                  </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}><Typography> {`Tournaments Organized: ${user.organized}`}</Typography></Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}><Typography>{`Tournaments Participated: ${user.participated}`}</Typography></Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}><Typography> {`Name: ${user.name}`}</Typography></Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}><Typography>{`Joined: ${getLocalTime(user.created_at)}`}</Typography></Paper>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}><Typography> {`Last Login: ${getLocalTime(user.last_login)}`}</Typography></Paper>
            </Grid> */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                  <Typography>
                    {user.about}
                  </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      );    }


export default withRouter(UserDetails);
