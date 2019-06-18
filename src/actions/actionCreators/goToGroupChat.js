import { combineReducers } from 'redux';
import {
    GOTO_GROUPCHAT
} from '../actionTypes'

export const goToGroupChat = (groupUsrIds) => (dispatch, getState) => {
    dispatch({
        type: GOTO_GROUPCHAT,
        payload: {
            groupUsrIds
        }
    });
};