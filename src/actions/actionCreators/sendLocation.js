import { combineReducers } from 'redux';

import {
    SEND_LOCATION,
} from '../actionTypes'

export const sendLocation = (locationObj) => (dispatch, getState) => {
    dispatch({
        type: 'SEND_LOCATION',
        payload: {
            ...locationObj
        }
    });
};