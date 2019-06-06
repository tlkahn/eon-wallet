import {
    GOTO_CONVERSATION
} from '../actions/actionTypes';

const initialState = {
    conversationId: null
};

export const goToConversation = (state = initialState.conversationId, action) => {
  switch (action.type) {
    case GOTO_CONVERSATION:
        return action.payload.id;
    default:
      return state;
  }
};

export default ({
    goToConversation
});

//selectors
export const getConversationID = (state) => {
  const conversationID = state.goToConversation;
  return conversationID;
}