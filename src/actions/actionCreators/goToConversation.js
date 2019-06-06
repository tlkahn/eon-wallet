import { combineReducers } from 'redux';
import {
    GOTO_CONVERSATION
} from '../actionTypes'

export const goToConversation = (conversationId) => (dispatch, getState) => {
  dispatch({
      type: GOTO_CONVERSATION,
      payload: {
          id: conversationId
      }
    });
};