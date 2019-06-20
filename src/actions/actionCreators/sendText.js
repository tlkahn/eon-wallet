import { combineReducers } from 'redux';

import {
    SEND_TEXT,
} from '../actionTypes'

export const sendText = (locationObj) => (dispatch, getState) => {
    dispatch({
        type: 'SEND_TEXT',
        payload: {
            ...locationObj
        }
    });
};