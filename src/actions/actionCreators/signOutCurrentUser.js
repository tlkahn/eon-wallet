import { combineReducers } from 'redux';

import {
    SIGN_OUT_CURRENT_USER
} from '../actionTypes'

export const signOutCurrentUser = () => (dispatch, getState) => {
    dispatch({
        type: 'SIGN_OUT_CURRENT_USER',
        payload: {
            signedOut: true
        }
    });
};