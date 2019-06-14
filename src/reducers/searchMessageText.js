import {
    SEARCH_MESSAGE_TEXT
} from '../actions/actionTypes';

const initialState = {
    searchMessageText: ""
};

export const searchMessageText = (state = initialState, action) => {
  switch (action.type) {
      case SEARCH_MESSAGE_TEXT:
        return {
            ...state,
            searchMessageText: action.payload.searchText
        };
    default:
      return state;
  }
};

export default ({
    searchMessageText
});

//selectors
export const getSearchMessageText= (state) => {
    return state.searchMessageText.searchMessageText;
};