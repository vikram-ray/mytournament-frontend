import * as actionTypes from '../ActionTypes';
import Axios from 'axios';
import { toast } from 'react-toastify';

export const TournamentStart = () => {
    return {
        type: actionTypes.TOURNAMENT_START
    }
}

export const TournamentEnd = () => {
    return {
        type: actionTypes.TOURNAMENT_END,
    }
}

export const TournamentPastSuccess = (data, total) => {
    return {
        type: actionTypes.TOURNAMENT_PAST_SUCCESS,
        data: data,
        total
    }
}

export const TournamentUpcomingSuccess = (data, total) => {
    return {
        type: actionTypes.TOURNAMENT_UPCOMING_SUCCESS,
        data: data,
        total
    }
}

export const MyTournamentSuccess = (data, total) => {
    return {
        type: actionTypes.MYTOURNAMENT_SUCCESS,
        data: data,
        total
    }
}

export const MyParticipationSuccess = (data, total) => {
    return {
        type: actionTypes.MYPARTICIPATION_SUCCESS,
        data: data,
        total
    }
}

export const MyTournamentDelete = () => {
    return {
        type: actionTypes.MYTOURNAMENT_DELETE,
    }
}


export const getPastTournament = (page=1) => {
    return dispatch => {
        dispatch(TournamentStart());
        Axios.get(`/api/tournaments/?page=${page}&past=true`).then((response)=>{
            dispatch(TournamentPastSuccess(response.data.results, response.data.count))
        }).catch((error)=>{
            try {
                toast.error(error.message);
            }
            catch(error){
                console.log(error);
                toast.error('Something went wrong');
            }
        }).finally(()=>{
            dispatch(TournamentEnd());
        })
    }
}

export const getUpcomingTournament = (page=1) => {
    return dispatch => {
        dispatch(TournamentStart());
        Axios.get(`/api/tournaments/?page=${page}`).then((response)=>{
            dispatch(TournamentUpcomingSuccess(response.data.results, response.data.count))
        }).catch((error)=>{
            try {
                toast.error(error.message);
            }
            catch(error){
                console.log(error);
                toast.error('Something went wrong');
            }
        }).finally(()=>{
            dispatch(TournamentEnd());
        })
    }
}

export const createTournament = (data, props) => {
    return dispatch => {
        dispatch(TournamentStart());
        Axios.post(`/api/tournaments/`, data).then((response)=>{
            toast.success('Tournament created successfully');
            dispatch(getMyTournament());
            props.history.push('/mytournament');
        }).catch((error)=>{
            try {toast.error(error.response.data.message);}
            catch(err){console.log(error, err); toast.error('Something went wrong');}
        }).finally(()=>{
            dispatch(TournamentEnd());
        })
    }
}


export const editTournament = (id, data, props) => {
    return dispatch => {
        dispatch(TournamentStart());
        Axios.patch(`/api/tournaments/${id}/`, data).then((response)=>{
            toast.success('Tournament edited successfully');
            dispatch(getMyTournament());
            props.history.push('/mytournament');
        }).catch((error)=>{
            try {
                toast.error(error.response.data.message);
            }
            catch(err){
                console.log(error, err);
                toast.error('Something went wrong');
            }
        }).finally(()=>{
            dispatch(TournamentEnd());
        })
    }
}


export const getMyTournament = (page=1) => {
    return dispatch => {
        dispatch(TournamentStart());
        Axios.get(`/api/tournaments/mytournament/?page=${page}`).then((response)=>{
            dispatch(MyTournamentSuccess(response.data.results, response.data.count))
        }).catch((error)=>{
            try {
                toast.error(error.message);
            }
            catch(error){
                toast.error('Something went wrong')
            }
        }).finally(()=>{
            dispatch(TournamentEnd());
        })
    }
}

export const deleteMytournament = (id, props) => {
    return dispatch => {
        dispatch(TournamentStart());
        Axios.delete(`/api/tournaments/${id}/`).then((response)=>{
            toast.error('Tournament deleted Successfully');
            props.history.push('/mytournament');
        }).catch((error)=>{
            try {
                toast.error(error.response.data.message);
            }
            catch(err){
                console.log(error, err);
                toast.error('Something went wrong')
            }
        }).finally(()=>{
            dispatch(TournamentEnd())
        })
    }
}


export const joinTournament = (id, props, CB, user) => {
    return dispatch => {
        dispatch(TournamentStart());
        let teamMates = user.filter((t, i)=>(i!==0)).map(t=>t.value)
        Axios.post(`/api/tournaments/${id}/participate/`, {teamMates}).then((response)=>{
            toast.success(response.data.message);
            CB();
        }).catch((error)=>{
            try {
                toast.error(error.response.data.message);
            }
            catch(err){
                console.log(error, err);
                toast.error('Something went wrong')
            }
        }).finally(()=>{
            dispatch(TournamentEnd())
        })
    }
}

export const getMyParticipation = (page=1) => {
    return dispatch => {
        dispatch(TournamentStart());
        Axios.get(`/api/tournaments/myparticipation/?page=${page}`).then((response)=>{
            let data = response.data.results;
            data = data.map(item=>item.mytournament)
            dispatch(MyParticipationSuccess(data, response.data.count))
        }).catch((error)=>{
            try {
                toast.error(error.message);
            }
            catch(err){
                console.log(error, err);
                toast.error('Something went wrong');
            }
        }).finally(()=>{
            dispatch(TournamentEnd())
        })
    }
}

export const sendNotification = (id,data, CB) => {
    return dispatch => {
        dispatch(TournamentStart());
        Axios.post(`/api/tournaments/${id}/notification/`, data).then((response)=>{
            toast.success(response.data.message)
            CB(id)
            dispatch(TournamentEnd());
        }).catch((error)=>{
            try {toast.error(error.response.data.message); dispatch(TournamentEnd()); }
            catch(error){toast.error('Something went wrong'); dispatch(TournamentEnd());}
        });
    }
}