import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import { toast } from 'react-toastify';
import Breadcrum from '../../../components/Breadcrum/Breadcrum';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withRouter} from 'react-router-dom';

import {  useSelector, useDispatch } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import Axios from 'axios';
import {getLocalTimeForInput, isBefore} from '../../Utils/TimeUtils';

import {createTournament, editTournament, TournamentStart, TournamentEnd} from '../../../store/actions/Tournament/Tournament';

let TEXT_COUNT = 25;
if (window.screen.width>700) {
  TEXT_COUNT = 100;
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function MytournamnetEditOrCreate(props) {
  const classes = useStyles();

  const [id, setId] = useState('')
  const [gameMode, setGameMode] = useState('');
  const [gameModeResult, setGameModeResult] = useState([]);
  const [game, setGame] = useState('');
  const [gameResult, setGameResult] = useState([]);
  const [platform, setPlatform] = useState('');
  const [platformResult, setPlatformresult] = useState([]);
  const [contactInfo, setContactInfo] = useState('');
  const [title, setTitle] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [winner, setWinner] = useState('');
  const [rules, setRules] = useState('');
  const [prize, setPrize] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [start, setStart] = useState('');
  const [editing, setEditing] = useState(false);

  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);
  const loading = useSelector(state=>state.tournament.loading);

  const handleChange = (event, type) => {
    const value = event.target.value;
    switch (type) {
      case 'game': setGame(value); break;
      case 'gameMode': setGameMode(value); break;
      case 'size': setSize(value.substring(0,3)); break;
      case 'platform': setPlatform(value); break;
      case 'description': setDescription(value.substring(0,2047)); break;
      case 'rules': setRules(value.substring(0,2047)); break;
      case 'contactInfo': setContactInfo(value.substring(0,250)); break;
      case 'title': setTitle(value.substring(0,50)); break;
      case 'organizer': setOrganizer(value.substring(0,20)); break;
      case 'prize': setPrize(value.substring(0,512)); break;
      case 'start': setStart(value); break;
      case 'winner': setWinner(value.substring(0,20)); break;
      default:
        console.log('error occured in signup');
    }
  }

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      platform,
      game_mode: gameMode,
      game,
      organizer,
      rules,
      prize,
      description,
      contact_info: contactInfo,
      size:Number(size),
      start:moment(start).toISOString(),
      title,
      winner
    }
    if(isBefore(moment(start).toISOString())){
      toast.error('Tournament time cannot be past date')
    }
    else if(editing) {
      dispatch(editTournament(id, data, props));
    }else{
      dispatch(createTournament(data, props));
    }
  }

  useEffect(()=>{
    dispatch(TournamentStart());
    const tid = props.match.params.id;
    setId(tid);

    Axios.get('/api/game/').then((response)=>{
      setGameResult(response.data.results);
      Axios.get('/api/gamemode/').then((response)=>{
        setGameModeResult(response.data.results);
        Axios.get('/api/platform/').then((response)=>{
          setPlatformresult(response.data.results);
          if(props.match.path === '/mytournament/edit/:id') {
            Axios.get('/api/tournaments/'+tid+'/').then((response)=>{
              const data = response.data.data;
              setEditing(true);
              setGame(data.game.id);
              setGameMode(data.game_mode.id);
              setPlatform(data.platform.id);
              setDescription(data.description);
              setContactInfo(data.contact_info);
              setOrganizer(data.organizer);
              setPrize(data.prize);
              setTitle(data.title);
              setSize(data.size);
              setStart(getLocalTimeForInput(data.start));
              setRules(data.rules);
              setWinner(data.winner);
              dispatch(TournamentEnd());
            }).catch((error)=>{
              console.log(String(error));
              toast.error('Something went wrong');          
            });
          }else{
            let threeDay = moment().add(3, 'days');
            setStart(threeDay.format('YYYY-MM-DDThh:mm'));
            dispatch(TournamentEnd());
          }
        }).catch((error)=>{
          console.log(String(error));
          toast.error('Something went wrong');
        });
      }).catch((error)=>{
        console.log(String(error));
        toast.error('Something went wrong');
      });
    }).catch((error)=>{
      console.log(String(error));
      toast.error('Something went wrong');
    });
  },[]);


  if(loading){return <Loader />}
  if(!isAuthenticated) {props.history.push('/login');}

  let heading = 'Create Your Tournament';
  if(editing) {
    heading = 'Edit Your Tournament or Appoint winner';
  }
  return (
    <Container component="main">
      <Breadcrum first={{text:"Home",to:"/"}} second={{text:"MyTournament",to:"/mytournament"}} third={{text:`${editing?'Edit':'Add'} Tournament`}}/>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {heading}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container align='left' spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoFocus
                id="title"
                label="Title"
                name="title"
                placeholder="Title for your tournament"
                value={title}
                onChange={(e)=>handleChange(e,'title')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="size"
                type='number'
                placeholder="Maximum number of players that can register"
                label="Size"
                name="size"
                helperText="Maximum players that can join"
                value={size}
                onChange={(e)=>handleChange(e,'size')}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="game">Game</InputLabel>
                <Select
                  labelId="game"
                  id="game"
                  required
                  value={game||""}
                  onChange={(e)=>handleChange(e,'game')}
                >
                  {gameResult.map((item)=><MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="platform">Platform</InputLabel>
                <Select
                  labelId="platform"
                  required
                  id="platform"
                  value={platform||""}
                  onChange={(e)=>handleChange(e,'platform')}
                >
                  {platformResult.map((item)=><MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="gameMode">Game Mode</InputLabel>
                <Select
                  labelId="gameMode"
                  id="gameMode"
                  required
                  value={gameMode||""}
                  onChange={(e)=>handleChange(e,'gameMode')}
                >
                  {gameModeResult.map((item)=><MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="organizer"
                placeholder="XTRM GAMERS"
                label="Organizer"
                name="organizer"
                value={organizer}
                onChange={(e)=>handleChange(e,'organizer')}
              />
            </Grid>
            <Grid item xs={8}>
              <FormControl className={classes.formControl}>
                <TextField
                  id="datetime-local"
                  label="Start time"
                  type="datetime-local"
                  value={start}
                  required
                  helperText="Note: Please change your tournament start time ( 24 hour format )"
                  onChange={(e)=>handleChange(e,'start')}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                fullWidth
                disabled={!editing}
                id="winner"
                placeholder="XTRM GAMERS"
                label="Winner"
                name="winner"
                value={winner||''}
                helperText="Appoint winner after your tournament is over"
                onChange={(e)=>handleChange(e,'winner')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                  id="contactInfo"
                  label="Contact Info"
                  multiline
                  fullWidth
                  required
                  value={contactInfo}
                  onChange={(e)=>handleChange(e,'contactInfo')}
                  rows={3}
                  placeholder="Contact info where participant can contact you.Your number or whatsapp group link "
                  variant="outlined"
                />             
            </Grid>
            <Grid item xs={12}>
              <TextField
                  id="description"
                  label="Description"
                  multiline
                  fullWidth
                  required
                  value={description}
                  onChange={(e)=>handleChange(e,'description')}
                  rows={7+(description.length/TEXT_COUNT)}
                  placeholder="Your description for the tournament"
                  variant="outlined"
                />             
            </Grid>
            <Grid item xs={12}>
              <TextField
                  id="rules"
                  label="Rules & Regulations"
                  multiline
                  required
                  value={rules}
                  onChange={(e)=>handleChange(e,'rules')}
                  fullWidth
                  rows={5+(description.length/TEXT_COUNT)}
                  placeholder="Rules and Regulation of your tournament"
                  variant="outlined"
                />           
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="prize"
                onChange={(e)=>handleChange(e,'prize')}
                label="Reward"
                multiline
                fullWidth
                required
                value={prize}
                rows={4+(description.length/TEXT_COUNT)}
                placeholder="Reward and winning of your tournament"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            required
            variant="contained"
            color="primary"
            disabled={!(game && gameMode && platform && description && contactInfo && rules && title && size && organizer && start && prize)}
            className={classes.submit}
            onClick={handleSubmit}
          >
            {editing?'Save':'Add'}
          </Button>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}

export default withRouter(MytournamnetEditOrCreate);