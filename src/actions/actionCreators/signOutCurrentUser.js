import { combineReducers } from 'redux';

import {
    LOG_IN_CURRENT_USER
} from '../actionTypes'

export const signOutCurrentUser = () => (dispatch, getState) => {
    dispatch({
        type: 'LOG_IN_CURRENT_USER',
        payload: {
            loggedIn: false
        }
    });
};