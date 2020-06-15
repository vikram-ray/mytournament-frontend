import {NavLink} from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    fab1: {
      position: 'fixed',
      bottom: theme.spacing(13),
      right: theme.spacing(0.5),
      },
    fab2: {
      position: 'fixed',
      bottom: theme.spacing(5),
      right: theme.spacing(0.5),
      },
  }));

export default function FloatingActionButtons({addTo, editTo, joinTo, deleteTo ,goTo,goToText, disabled}) {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        {goTo?<NavLink to={goTo||'/'}><Fab color="primary" variant="extended" className={classes.fab2} ><SportsEsportsIcon /> {goToText} </Fab></NavLink>:null}
        {addTo?<NavLink  disabled={disabled} to={addTo||'/'}><Fab color="primary" aria-label="add" className={classes.fab2} ><AddIcon /> </Fab></NavLink>:null}
        {editTo?<NavLink  disabled={disabled} to={editTo||'/'}><Fab color="secondary" aria-label="edit" className={classes.fab2} ><EditIcon /></Fab></NavLink>:null}
        {joinTo?<Fab  disabled={disabled}  onClick={joinTo} variant="extended" className={classes.fab2} ><SportsEsportsIcon /> Join </Fab>:null}
        {deleteTo?<Fab  disabled={disabled} onClick={deleteTo} color="primary" className={classes.fab1}  ><DeleteIcon /> </Fab>:null}
      </div>
    );
  }
  