import {
    SEND_TEXT
} from '../actions/actionTypes';

const initialState = {
    conversationId: null,
    latestMessage: null
};

export const sendText = (state = initialState, action) => {
  switch (action.type) {
      case SEND_TEXT:
        return {
            ...state,
            conversationId: action.payload.conversationId,
            latestMessage: action.payload.message,
            timestamp: action.payload.timestamp,
        };
    default:
      return state;
  }
};

export default ({
    sendText
});

//selectors
export const getSendTextStatus = (state) => {
    const {conversationId, latestMessage, timestamp} = state.sendText;
    return {
        conversationId,
        latestMessage,
        timestamp
    }
};