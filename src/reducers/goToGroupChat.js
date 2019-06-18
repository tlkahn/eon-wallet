import {
    GOTO_GROUPCHAT
} from '../actions/actionTypes';

const initialState = {
    groupUsrIds: []
};

export const goToGroupChat = (state = initialState.groupUsrIds, action) => {
  switch (action.type) {
    case GOTO_GROUPCHAT:
        return {
            groupUsrIds: action.payload.groupUsrIds
        };
    default:
      return state;
  }
};

export default ({
    goToGroupChat
});

//selectors
export const getGroupChatUsrIds = (state) => {
  return state.goToGroupChat.groupUsrIds;
}