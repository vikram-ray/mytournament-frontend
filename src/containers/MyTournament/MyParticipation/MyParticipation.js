import React, {Fragment, useEffect, useState} from 'react';

import MtCard from '../../../components/Card/Card'
import Breadcrum from '../../../components/Breadcrum/Breadcrum'
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from 'react-redux';
import { Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import Loader from '../../../components/Loader/Loader';
import Pagination from '../../../components/Pagination/Pagination';
import Fab from '../../../components/Fab/Fab';

import {getMyParticipation} from '../../../store/actions/Tournament/Tournament'

function MyParticipation(){
        const dispatch = useDispatch()

        const [offset,SetOffset] = useState(0);

        const loading = useSelector(state=>state.tournament.loading);

        const myTournament = useSelector(state=>state.tournament.myParticipation)
        const myTournamentTotal = useSelector(state=>state.tournament.myParticipationTotal)

        const handleClick = (offset, pageNo)=> {
            SetOffset(offset)
            dispatch(getMyParticipation(pageNo));
        }

        const MytournamentPagination = (<Pagination
                limit={6}
                offset={offset}
                total={myTournamentTotal}
                handleClick={handleClick}
            />)

        const MyTournaments = (
            myTournament.length>0?<React.Fragment>
                <Container style={{'display':'flex','flexWrap':'wrap', 'padding':'0px'}} >
                {myTournament.map((item, index)=><MtCard total={myTournamentTotal} tournament={item} key={index} />)}
                </Container>
                {MytournamentPagination}
            </React.Fragment>:null)
        
        useEffect(()=>{
            dispatch(getMyParticipation());
        },[])
        
        if(loading){return <Loader />}
        return (
            <Fragment>
                <Breadcrum first={{text:"Home",to:"/"}} third={{text:'MyParticipation'}}/>
                <CssBaseline />
                {myTournament.length===0?<Typography variant='h6'>Looks like you have not participated in any tournament yet!</Typography>:MyTournaments}
                <Fab goTo='/tournament' goToText='Participate' />
            </Fragment>
        )
    }


export default MyParticipation;

