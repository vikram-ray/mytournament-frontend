import * as actionTypes from '../../actions/ActionTypes';
import { updateObject } from '../../utility';

const intialState = {
    past: [],
    loading: false,
    upcoming:[],
    pastTotal: null,
    upcomingTotal: null,
    myTournament:[],
    myTournamentTotal:null,
    myParticipation:[],
    myParticipationTotal: null,
}

const tournamentStart = (state, action) => {
    return updateObject(state,{
        loading: true,
    })
}

const tournamentEnd = (state, action) => {
    return updateObject(state,{
        loading: false,
    })
}

const tournamentPastSuccess = (state, action) => {
    return updateObject(state,{
        loading: false,
        past: action.data,
        pastTotal: action.total,
    })
}

const tournamentUpcomingSuccess = (state, action) => {
    return updateObject(state,{
        loading: false,
        upcoming: action.data,
        upcomingTotal: action.total,
    })
}

const myTournamentSuccess = (state, action) => {
    return updateObject(state,{
        loading: false,
        myTournament: action.data,
        myTournamentTotal: action.total,
    })
}

const MyParticipationSuccess = (state, action) => {
    return updateObject(state,{
        loading: false,
        myParticipation: action.data,
        myParticipationTotal: action.total,
    })
}


const myTournamentDelete = (state, action) => {
    return updateObject(state,{
        loading: false,
    });
}

const reducer = (state=intialState, action) => {
    switch (action.type) {
        case actionTypes.TOURNAMENT_START: return tournamentStart(state, action);
        case actionTypes.TOURNAMENT_PAST_SUCCESS: return tournamentPastSuccess(state, action);
        case actionTypes.TOURNAMENT_UPCOMING_SUCCESS: return tournamentUpcomingSuccess(state, action);
        case actionTypes.TOURNAMENT_END: return tournamentEnd(state, action);
        case actionTypes.MYTOURNAMENT_SUCCESS: return myTournamentSuccess(state, action);
        case actionTypes.MYTOURNAMENT_DELETE: return myTournamentDelete(state, action);
        case actionTypes.MYPARTICIPATION_SUCCESS: return MyParticipationSuccess(state, action);
        default:
            return state;
    }
}

export default reducer;