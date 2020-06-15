import * as actionTypes from '../ActionTypes';
import Axios from 'axios';
import { toast } from 'react-toastify';

export const AuthStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const AuthSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    }
}

export const SetProfile = (user) => {
    return {
        type: actionTypes.SET_PROFILE,
        user: user,
    }
}


export const EndProfile = () => {
    return {
        type: actionTypes.PROFILE_END,
    }
}


export const AuthFail = () => {
    return {
        type: actionTypes.AUTH_FAIL,
    }
}

export const AuthLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const Logout = (props) => {
    return dispatch => {
        localStorage.clear('user');
        localStorage.clear('expirationTime');
        localStorage.clear('token');
        dispatch(AuthLogout());
        if(props){props.history.push('/');}
    }
}

export const AuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(Logout());
        }, expirationTime*1000);
    }
}

export const GetProfile = (id) => {
    return dispatch => {
        if (!id){return}
        dispatch(AuthStart());
        Axios.get(`/api/users/${id}/`).then((response)=>{
            const user = response.data.data;
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(SetProfile(user));
        }).catch((error)=>{
            toast.error(error.response.data.message);
            dispatch(AuthFail());
        })
    }
}

export const UpdateProfile = (id, data) => {
    return dispatch => {
        dispatch(AuthStart());
        Axios.patch(`/api/users/${id}/`, data).then((response)=>{
            toast.success('Profile Updated Successfully');
            dispatch(GetProfile(id));
        }).catch((error)=>{
            toast.error("Something went wrong. Please check your details.");
            dispatch(EndProfile());
        })
    }
}


export const AuthLogin = (username, password, props) => {
    return dispatch => {
        dispatch(AuthStart());
        Axios.post('/api/users/login/',{
            username,
            password
        }).then((res)=>{
            const {token, id } = res.data;
            const expirationTime = new Date(new Date().getTime() + 3600*1000*24*15);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(AuthSuccess(token));
            dispatch(GetProfile(id));
            dispatch(AuthTimeout(3600*24*15));
            props.history.push('/');
            toast.success('Login Successful');
        }).catch((error)=>{
            try{
                toast.error(error.response.data.non_field_errors[0]);
                dispatch(AuthFail());
            }catch(error){
                console.log(error);
                toast.error('Something went wrong');
                dispatch(AuthFail());
            }
        })
    }
}


export const AuthSignup = ({username, password, name, mobile, otp}, props) => {
    return dispatch => {
        dispatch(AuthStart());
        Axios.post('/api/users/signup/',{
            username,
            password,
            mobile,
            otp,
            name
        }).then((res)=>{
            toast.success('Signup successful');
            dispatch(AuthLogin(mobile, password, props));
        }).catch((error)=>{
            try {
                toast.error(error.response.data.message);
                dispatch(AuthFail());
            }
            catch(error){
                console.log(error);
                toast.error('Something went wrong');
                dispatch(AuthFail());
            }
        })
    }
}

export const authCheckState = () =>{    
    return dispatch => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (!token){
            dispatch(Logout());
        }else{
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime < new Date()){
                dispatch(Logout());
            }else if(token && user) {
                dispatch(AuthSuccess(token));
                dispatch(GetProfile(user.id));
                dispatch(AuthTimeout((expirationTime.getTime() - new Date().getTime())/1000));
            }
        }
    }
}


export const ChangePassword = (id,data) =>{
    return dispatch => {
        if(!id || !data) {return};
        dispatch(AuthStart());
        Axios.post(`/api/users/${id}/change_password/`, data).then((response)=>{
            toast.success(response.data.message)
            dispatch(EndProfile());
        }).catch((error)=>{
            toast.error(error.response.data.message)
            dispatch(EndProfile())
        })
    }
}