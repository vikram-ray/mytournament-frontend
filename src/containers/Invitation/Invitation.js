import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader/Loader';
import Paper from '../../components/Paper/Paper';
import Fab from '../../components/Fab/Fab';
import { toast } from 'react-toastify';
import Breadcrum from '../../components/Breadcrum/Breadcrum';
import Axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Typography} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    if(mobile.length<10){
        toast.error('Please provide 10 digit mobile number')
    }else {
        const data = {
            'mobile': mobile
        }
        setLoading(true);
        Axios.post('/api/utils/invite/',data).then((response)=>{
            toast.success('Invitation sucessfully sent.');
            setLoading(false);
        }).catch((error)=>{
            toast.error(error.response.data.mobile[0]);
            setLoading(false);
        })
    }
  }

  if(loading) {return <Loader />}

  return (
    <div className={classes.root}>
    <Fab addTo='/mytournament/create' />
    <Breadcrum first={{text:"Home",to:"/"}} third={{text:"Invitation"}}/>
    <CssBaseline />
    <Paper>
      <Grid container spacing={1}>
          <Typography variant='h5' >We will send an invite to your friend with your username</Typography>
          <CssBaseline/>
        <Grid item xs={12}>
          <TextField
            label="Mobile Number"
            id="MNumber"
            value={mobile || ''}
            className={classes.textField}
            onChange={e=>setMobile(e.target.value.substring(0,10))}
            type='number'
            margin="normal"
          />
        </Grid>

        <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={handleSubmit}
          disabled={mobile.length<10}
          startIcon={<SendIcon />}
        >
          Invite
      </Button>

        </Grid>
      </Grid>

    </Paper>

    </div>
  );
}
