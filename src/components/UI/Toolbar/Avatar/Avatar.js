import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useSelector} from 'react-redux';

export default function ShareIcon() { 
    const user = useSelector(state=>state.auth.user);
    let name = '';
    if (user && 'name' in user){
    name = user.name;
    }
    return (name?<Avatar>{name.substring(0,1)}</Avatar>:<Avatar/>)
} 

