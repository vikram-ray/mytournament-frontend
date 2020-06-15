import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '../../../components/Fab/Fab';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import Loader from '../../../components/Loader/Loader';
import ExpansionBar from './ExpansionBar/ExpansionBar';
import {withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Axios from 'axios';
import {getLocalTime, isBefore }from '../../Utils/TimeUtils';
import ConfirmModal from './ConfirmDialog/ConfirmDialog';
import NotiModal from './NotificationDialog/NotificationDialog';
import Breadcrum from '../../../components/Breadcrum/Breadcrum';
import CssBaseline from '@material-ui/core/CssBaseline';

import {TournamentStart, TournamentEnd, deleteMytournament, joinTournament, sendNotification} from '../../../store/actions/Tournament/Tournament'
import moment from 'moment';


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

function TournamentDetail(props) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [id, setId] = useState(null);
    const [organizer, setOrganizer] = useState(false);
    const [tournament, setTournament] = useState(null);
    const [participant, setParticipant] = useState([]);
    const [totalParticipant, setTotalParticipant] = useState();
    const [participated, setParticipated] = useState(false);
    const [modal, setModal] = useState(false);
    const [notiModal, setNotiModal] = useState(false);

    const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);
    const user = useSelector(state=>state.auth.user);
    const loading = useSelector(state=>state.tournament.loading);
    const myTournament = useSelector(state=>state.tournament.myTournament);
    const past = useSelector(state=>state.tournament.past);
    const upcoming = useSelector(state=>state.tournament.upcoming);
    const [dateColor, setDateColor] = useState('initial');
    if(dateColor!=='error' && tournament && isBefore(moment(tournament.start).local())) {
        setDateColor('error');
      }
    if(!organizer) {
        if(user && tournament) {
            if(tournament.created_by.id === user.id) {
                setOrganizer(true);
            }
        }
    }    

    const getParticipants = (page=1,count=10, tid=id) => {
        Axios.get('/api/tournaments/'+tid+'/participant/?page='+page+"&limit="+count).then((response)=>{
            setParticipated(response.data.participated);
            setParticipant(response.data.data.results);
            setTotalParticipant(response.data.data.count);
            dispatch(TournamentEnd());
        }).catch((error)=>{
            try{dispatch(TournamentEnd());}
            catch(error){dispatch(TournamentEnd());}
    });
    }

    const getTournament = (tourna) => {
        Axios.get('/api/tournaments/'+tourna+'/').then((response)=>{
            setTournament(response.data.data);
            dispatch(TournamentEnd());
        }).catch((error)=>{
            try{dispatch(TournamentEnd()); toast.error(error.response.data.message)}
            catch(error){dispatch(TournamentEnd()); toast.error('Something went wrong')}
        });
    }

    useEffect(()=>{
        dispatch(TournamentStart());
        const tid = props.match.params.id;
        setId(tid);
        let tournamentdata = null;
        const allTournament = myTournament.concat(past.concat(upcoming));
        allTournament.map((item)=>{
            if(item.id === tid) { tournamentdata = item } return null;
        });
        getParticipants(1,10, tid);
        if(!tournamentdata) { 
            getTournament(tid)
        }else{
            setTournament(tournamentdata);
            dispatch(TournamentEnd());
        }
    },[]);

    const handleDelete = () => {dispatch(deleteMytournament(tournament.id, props));}
    const modalToggler = () => { setModal(!modal) }
    const notiModalToggler = () => { setNotiModal(!notiModal) }
    const handleJoin = (user) => {
        setModal(false);
        if(isAuthenticated) {dispatch(joinTournament(tournament.id, props, getParticipants,user ));}
        else {toast.error('Please login to join this tournament')}
    }
    const handleNotification = (message, sms) => {
        setNotiModal(false);
        dispatch(sendNotification(id,{message},getTournament));        
    }

    if(loading|| !tournament){return <Loader />}
    let winnerText = '';
    if(dateColor==='error') {
        winnerText = tournament.winner? `WINNER: ${tournament.winner}`: `No winner appointed`
    }

    let myNotification = []
    if(tournament.notifications) {
        myNotification = [...tournament.notifications]
        myNotification.reverse()
    }

    return (
        <div className={classes.root}>
            <Breadcrum first={{text:"Home",to:"/"}} second={{text:"Tournament",to:"/tournament"}} third={{text:'Tournament'}}/>
            <CssBaseline />
           {modal? <ConfirmModal tournament={tournament} isOpen={modal} handleSubmit={handleJoin} modalToggler={modalToggler} />:null}
           {notiModal? <NotiModal isOpen={notiModal} handleSubmit={handleNotification} modalToggler={notiModalToggler} />: null}
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h6">
                        {tournament.title}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item sm={3} xs={6}>
                <Paper className={classes.paper}>
                    <Typography variant='body2'>
                        {"Organized by "+ tournament.organizer}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item sm={3} xs={6}>
                <Paper className={classes.paper}>
                    <Typography color={dateColor} variant='body2'>
                        {getLocalTime(tournament.start)}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item sm={3} xs={6}>
                <Paper className={classes.paper}>
                    <Typography variant='body2'>
                        {tournament.platform.name}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item sm={3} xs={6}>
                <Paper className={classes.paper}>
                    <Typography variant='body2'>
                        {`${tournament.total_participants}/${tournament.size} Joined`}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item sm={3} xs={6}>
                <Paper className={classes.paper}>
                    <Typography variant='body2'>
                        {tournament.game_mode.name}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item sm={3} xs={6}>
                <Paper className={classes.paper}>
                    <Typography variant='body2'>
                        {tournament.game.name}
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <ExpansionBar
                    panel1={{heading1: 'Description', content: tournament.description}}
                    panel2={{heading1: 'Rules & Regulations', content: tournament.rules}}
                    panel3={{heading1: 'Prize & Reward', content: tournament.prize}}
                    panel4={{heading1: 'Contact Information', content: tournament.contact_info}}
                    notifications={myNotification}
                    participants = {participant}
                    participantsHandler = {getParticipants}
                    total = {totalParticipant}
                    winnerText = {winnerText}
                    isAuthenticated = {isAuthenticated}
                    participated = {participated}
                    organizer = {organizer}
                 />
            </Grid>
        </Grid>
         {organizer? <Fab editTo={`/mytournament/edit/${id}/`} deleteTo={handleDelete}  />:<Fab disabled={dateColor==='error'} joinTo={modalToggler} />}
         {organizer?<Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={notiModalToggler}
        >
            Send Notification
            <AddAlertIcon/>
        </Button>:null}
        </div>
    );
    }


export default withRouter(TournamentDetail);