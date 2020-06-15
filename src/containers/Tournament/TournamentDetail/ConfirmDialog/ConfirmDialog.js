import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AsyncSelect from 'react-select/async';

import {useSelector} from 'react-redux';

import Axios from 'axios';

export default function AlertDialog({isOpen, handleSubmit, modalToggler, tournament}) {
  const GAME_MODE = tournament.game_mode.name
//   const [open, setOpen] = React.useState(isOpen);

// //   const handleClickOpen = () => {
// //     setOpen(true);
// //   };

//   const handleClose = () => {
//     setOpen(false);
//   };
const user = useSelector(state=>state.auth.user);
const leader = {label: user.username, value: user.id }
const [users, setUsers] = useState([leader]);

const loadOptions = (inputValue, callback) => {
  Axios.get(`/api/users/?search=${inputValue}`).then((response)=>{
      let searchResult = response.data.results.map((user)=>({label: user.username, value: user.id}));
      callback(searchResult);
    }).catch(()=>{
      callback([]);
    })
};
console.log(tournament);

const handleOnchange = (data) => {
  if (data && Array.isArray(data)) {
    if(data.length > 0) {
      if (data[0].value === leader.value) {
        if(GAME_MODE === 'DUO') {
          setUsers(data.slice(0,2));
        }else if(GAME_MODE === 'SQUAD') {
          setUsers(data.slice(0,4));
        }
      }
    }
  }
}

let notSoloText = '';
if (GAME_MODE !== 'SOLO') {
  notSoloText = 'You can search and add multiple users with their username and mobile in below text field.'
}

  return (
    <div >
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Please confirm before joining
      </Button> */}
      <Dialog
        open={isOpen}
        onClose={modalToggler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Please fill details and read carefully"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Organizer can cancel your rewards if you dont follow the rules and instruction. {notSoloText}
          </DialogContentText>
        </DialogContent>
        <div style={{padding: '1rem', paddingBottom: '7rem'}} >
        <pre>Team: {(users && Array.isArray(users) && (users.map((u,i)=>`${i+1}.${u.label}`)).join(' '))}</pre>
        <AsyncSelect
          loadOptions={loadOptions}
          isMulti
          onChange={handleOnchange}
          value={users}
          autoFocus
          placeholder='Search with username and mobile'
          isDisabled={GAME_MODE === 'SOLO'}
        />
      </div>
        <DialogActions>
          <Button onClick={modalToggler} color="primary">
           Cancel
          </Button>
          <Button onClick={()=>handleSubmit(users)} color="primary" autoFocus>
          Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
