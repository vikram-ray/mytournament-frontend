import React, {Fragment, useEffect, useState} from 'react';

import MtCard from '../../../components/Card/Card'
import Breadcrum from '../../../components/Breadcrum/Breadcrum'
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import Loader from '../../../components/Loader/Loader';
import Pagination from '../../../components/Pagination/Pagination';
import Fab from '../../../components/Fab/Fab';

import {getMyTournament} from '../../../store/actions/Tournament/Tournament'
import { Typography } from '@material-ui/core';

function Tournament(){
        const dispatch = useDispatch()

        const [offset,SetOffset] = useState(0);

        const loading = useSelector(state=>state.tournament.loading);

        const myTournament = useSelector(state=>state.tournament.myTournament)
        const myTournamentTotal = useSelector(state=>state.tournament.myTournamentTotal)

        const handleClick = (offset, pageNo)=> {
            SetOffset(offset)
            dispatch(getMyTournament(pageNo));
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
            dispatch(getMyTournament());
        },[])
        
        if(loading){return <Loader />}
        return (
            <Fragment>
                <Breadcrum first={{text:"Home",to:"/"}} third={{text:'MyTournament'}}/>
                <CssBaseline />
                {myTournament.length===0?<Typography variant='h6'>Looks like you have not organized any tournaments yet!</Typography>:MyTournaments}
                <Fab addTo='/mytournament/create' />
            </Fragment>
        )
    }


export default Tournament

