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
            latestMessage: action.payload.message
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
    const {conversationId, latestMessage} = state.sendText;
    return {
        conversationId,
        latestMessage
    }
};