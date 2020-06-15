import {combineReducers} from 'redux';

import Auth from './Auth/Auth';
import Tournament from './Tournament/Tournament';

const rootReducers = combineReducers({
    'auth':Auth,
    'tournament': Tournament
});

export default rootReducers;
