import * as actionTypes from '../../actions/ActionTypes';
import { updateObject } from '../../utility';

const intialState = {
    token: null,
    loading: false,
    user:null,
    isAuthenticated: false
}

const authStart = (state, action) => {
    return updateObject(state,{
        loading: true,
    })
}

const authSuccess = (state, action) => {
    return updateObject(state,{
        loading: false,
        token: action.token,
        isAuthenticated: true,
    })
}

const authFail = (state, action) => {
    return updateObject(state,{
        loading: false,
        token: null,
        isAuthenticated: false,
        user: null
    })
}

const authLogout = (state, action) => {
    return updateObject(state,{
        loading: false,
        token: null,
        isAuthenticated: false,
        user: null
    })
}

const setProfile = (state, action) => {   
    return updateObject(state,{
        loading: false,
        user: action.user,
        id: action.user.id
    })
}


const endProfile = (state, action) => {
    return updateObject(state,{
        loading: false,
    });
}


const reducer = (state=intialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_PROFILE: return setProfile(state, action);
        case actionTypes.PROFILE_END: return endProfile(state, action);
        default:
            return state;
    }
}

export default reducer;