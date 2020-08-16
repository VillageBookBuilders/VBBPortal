import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: localStorage.getItem('token'),
    error: null, 
    loading: false,
    message: null
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        message: null
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: true,
        message: action.error.message,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        message:null
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;