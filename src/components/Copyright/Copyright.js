import React from 'react';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom';

const copyRight = () => (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <NavLink to="/">
        MyTournament
      </NavLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );

export default copyRight;