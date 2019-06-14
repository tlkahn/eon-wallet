import { combineReducers } from 'redux';

import {
    SEARCH_MESSAGE_TEXT
} from '../actionTypes'

export const searchMessageText = (searchText) => (dispatch, getState) => {
    dispatch({
        type: 'SEARCH_MESSAGE_TEXT',
        payload: {
            searchText: searchText
        }
    });
};