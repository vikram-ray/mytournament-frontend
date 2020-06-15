import React ,{ Fragment} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import {NavLink} from 'react-router-dom'

const SidedrawerItem = (props) =>{
  if(props.icon.onClick) {
    return (<Fragment>
        <ListItem onClick={() => props.icon.onClick()} button key={props.icon.text} >
          <ListItemIcon>{props.icon.icon}</ListItemIcon>
            <ListItemText onClick={props.onclick} primary={props.icon.text} />
        </ListItem>
        {props.icon.divider? <Divider />:null }
    </Fragment>)
  } 
  return (<Fragment>
    <NavLink to={props.icon.link} activeClassName="active-link" >
      <ListItem button key={props.icon.text} >
        <ListItemIcon>{props.icon.icon}</ListItemIcon>
          <ListItemText onClick={props.onclick} primary={props.icon.text} />
      </ListItem>
      {props.icon.divider? <Divider />:null }
    </NavLink>
  </Fragment>)
}


export default SidedrawerItem;