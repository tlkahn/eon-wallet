import {
    SEND_LOCATION
} from '../actions/actionTypes';

const initialState = {
    conversationId: null,
    latestMessage: null
};

export const sendLocation = (state = initialState, action) => {
  switch (action.type) {
      case SEND_LOCATION:
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
    sendLocation
});

//selectors
export const getSendLocationStatus = (state) => {
    const {conversationId, latestMessage} = state.sendLocation;
    return {
        conversationId,
        latestMessage
    }
};