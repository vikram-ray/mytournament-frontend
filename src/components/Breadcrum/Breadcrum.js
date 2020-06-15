import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import {NavLink} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomSeparator({first,second,third}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {first?<NavLink color="inherit" to={first.to} >
          {first.text}
        </NavLink>:null}
        {second?<NavLink color="inherit" to={second.to}>
          {second.text}
        </NavLink>:null}
        {third?<Typography color="textPrimary">{third.text}</Typography>:null}
      </Breadcrumbs>
      <Divider />
    </div>
  );
}
