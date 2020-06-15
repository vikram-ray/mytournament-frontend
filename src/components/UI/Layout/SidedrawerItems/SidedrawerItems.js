import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import List from '@material-ui/core/List';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/Info';
import ShareIcon from '../../Toolbar/ShareIcon/ShareIcon';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import LockIcon from '@material-ui/icons/Lock';
import HistoryIcon from '@material-ui/icons/History';
import SearchIcon from '@material-ui/icons/Search';
import SidedrawerItem from './SidedrawerItem/SidedrawerItem';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Badge from '@material-ui/core/Badge';

import {withRouter} from 'react-router-dom';
import {Logout} from '../../../../store/actions/Auth/Auth';

let SidedrawerItems = (props) => {
    const dispatch = useDispatch();
    const isAuthenticated  = useSelector(state=>state.auth.isAuthenticated);
    const user = useSelector(state=>state.auth.user);
    const handleLogout = () => dispatch(Logout(props));

    let MyTournament = <FormatListNumberedRtlIcon />
    let MyParticipation = <HistoryIcon />
    if(user) {
        MyTournament = <Badge badgeContent={user.organized} color="primary"><FormatListNumberedRtlIcon /></Badge>;
        MyParticipation = <Badge badgeContent={user.participated} color="primary"><HistoryIcon /></Badge>;
    }

    let sideDrawerItems = [
        {
            text:'Account',
            icon: <AccountCircleIcon />,
            link: '/account'
        },
        {
            text:'Search User',
            icon: <SearchIcon />,
            link: '/search'
        },
        {
            text:'Login',
            icon: <LockIcon />,
            link: '/login'
        },
        {
            text:'Signup',
            icon: <AccountCircleIcon />,
            link: '/signup'
        },
        {
            text:'Participate',
            icon: <SportsEsportsIcon />,
            link: '/tournament'
        },
        {
            text:'My Tournament',
            icon: MyTournament,
            link: '/mytournament'
        },
        {
            text:'My Participation',
            icon: MyParticipation,
            link: '/myparticipation'
        },
        {
            text:'Organize',
            icon: <AddBoxIcon />,
            link: '/mytournament/create',
            divider: true
        },
        {
            text:'About Us',
            icon: <InfoIcon />,
            link: '/about'
        },
        {
            text:'Contact Us',
            icon: <ContactSupportIcon />,
            divider: true,
            link: '/contact'
        },
        {
            text:'Share or Invite',
            icon: <ShareIcon />,
            link:'/invite',
            divider: true
        },
        {
            text:'Change Password',
            icon: <AutorenewIcon />,
            link: '/change-password'
        },
        {
            text:'Forgot password',
            icon: <HelpOutlineIcon />,
            link: '/forgot-password',
        },
        {
            text:'Logout',
            icon: <ExitToAppIcon />,
            link: '/logout',
            onClick: handleLogout
        },
    ]

    if(isAuthenticated) {
        const notForLoggedinUser = ['/login','/signup','/forgot-password']
        sideDrawerItems = sideDrawerItems.filter((item)=>!notForLoggedinUser.includes(item.link))
    }else{
        const notForAnonimousUser = ['/logout','/change-password',]
        sideDrawerItems = sideDrawerItems.filter((item)=>!notForAnonimousUser.includes(item.link))

    }    
    return (
        <React.Fragment>
            <List>
                {sideDrawerItems.map((item, index)=><SidedrawerItem onclick={props.onclick} key={index} icon={item}/>)}
            </List>
        </React.Fragment>
    )
}

export default withRouter(SidedrawerItems);