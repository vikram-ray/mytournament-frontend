import React, {Fragment, useEffect, useState} from 'react';

import Card from '../../../components/Card/Card'
import Breadcrum from '../../../components/Breadcrum/Breadcrum'
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import Tabs from './TournamentTabs/TournamentTabs'
import Loader from '../../../components/Loader/Loader';
import Pagination from '../../../components/Pagination/Pagination';

import {getPastTournament, getUpcomingTournament} from '../../../store/actions/Tournament/Tournament'

function Tournament(){
        const dispatch = useDispatch()

        const [pastOffset,SetPastOffset] = useState(0);
        const [upcomingOffset,SetUpcomingOffset] = useState(0);
        const [value, setValue] = React.useState(0);

        const loading = useSelector(state=>state.tournament.loading);

        const pastTournament = useSelector(state=>state.tournament.past)
        const upcomingTournament = useSelector(state=>state.tournament.upcoming)
        const pastTotal = useSelector(state=>state.tournament.pastTotal)
        const upcomingTotal = useSelector(state=>state.tournament.upcomingTotal)

        const handlePastClick = (offset, pageNo)=> {
            SetPastOffset(offset)
            dispatch(getPastTournament(pageNo));
        }

        const handleUpcomingClick = (offset, pageNo)=> {
            SetUpcomingOffset(offset)
            dispatch(getUpcomingTournament(pageNo))
          }

        const handleChange = (event, newValue) => {
            setValue(newValue);
          };

        const handleChangeIndex = index => {
            setValue(index);
          };

        const pastPagination = (<Pagination
                limit={6}
                offset={pastOffset}
                total={pastTotal}
                handleClick={handlePastClick}
            />)

        const upcomingPagination = (<Pagination
            limit={6}
            offset={upcomingOffset}
            total={upcomingTotal}
            handleClick={handleUpcomingClick}
        />)

        const tournamentPast = (
            pastTournament?<React.Fragment>
                <Container style={{'display':'flex','flexWrap':'wrap', 'padding':'0px'}} >
                    {pastTournament.map((item, index)=><Card total={pastTotal} tournament={item} key={index} />)}
                </Container>
                {pastPagination}
            </React.Fragment> :null)

        const tournamentUpcoming = (
            upcomingTournament?<React.Fragment>
                <Container style={{'display':'flex','flexWrap':'wrap', 'padding':'0px'}} >
                {upcomingTournament.map((item, index)=><Card total={upcomingTotal} tournament={item} key={index} />)}
                </Container>
                {upcomingPagination}
            </React.Fragment>:null)
        
        useEffect(()=>{
            dispatch(getUpcomingTournament(1));
            dispatch(getPastTournament(1));
        },[])
        
        if(loading){return <Loader />}
        return (
            <Fragment>
                <Breadcrum first={{text:"Home",to:"/"}} third={{text:'Tournament'}}/>
                <CssBaseline />
                    <Tabs handleChangeIndex={handleChangeIndex} handleChange={handleChange} value={value} upcoming={tournamentUpcoming} past={tournamentPast} ></Tabs>
                <NavLink to='/mytournament/create' >
                <Fab color="primary" aria-label="add" style={{position:'fixed', right:'2rem', bottom: '2rem' }}>
                    <AddIcon />
                </Fab>
                </NavLink>
            </Fragment>
        )
    }


export default Tournament

