import { combineReducers } from 'redux';

import {
    SELECT_EMOJI
} from '../actionTypes'

export const selectEmoji = (emoji) => (dispatch, getState) => {
    dispatch({
        type: 'SELECT_EMOJI',
        payload: {
            emoji
        }
    });
};