import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Avatar}  from '@material-ui/core'
import Axios from 'axios';
import {NavLink} from 'react-router-dom';
import Breadcrum from '../../components/Breadcrum/Breadcrum';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const CustomList = ({user}) => {
  let { participated, organized, about, username, id, name} = user;
  if (about && about.length>50){about=about.substring(0,75)+'...'}
  return (<React.Fragment>
          <NavLink to={`/user/${id}`}>
            <ListItem button>
              <ListItemIcon>
                <Avatar>{username.substring(0,1)}</Avatar>   
              </ListItemIcon>
              <ListItemText 
                primary={`${username} (${name})`} 
                secondary={about} />
            </ListItem>
            <Typography>
              Organized: {organized} & Participated: {participated}
            </Typography>
        <Divider/>
        </NavLink>
  </React.Fragment>)
}

export default function Search() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    const text = event.target.value.substring(0,20)
    setSearchText(text)
    if(text.length < 3 || text.length>20) {return}
    Axios.get(`/api/users/?search=${text}`).then((response)=>{
      setUsers(response.data.results)
    })
  }

  return (
    <Grid>
      <Breadcrum first={{text:"Home",to:"/"}} third={{text:'Search'}}/>
      <Paper component="form" onSubmit={e => { e.preventDefault(); }} className={classes.root}>
        <InputBase
          className={classes.input}
          onChange={handleSearch}
          value={searchText}
          onSubmit={e=>console.log}
          placeholder="Search by username or phone"
          inputProps={{ 'aria-label': 'search by username or phone' }}
        />
        <IconButton type="button" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <List component="nav">
        {users.length===0 && searchText.length>2?<Typography variant='h5'>No user is associated with {searchText}</Typography>:null}
        {users.map((user)=><CustomList key={user.id} user={user} />)}
      </List>

    </Grid>
  );
}
