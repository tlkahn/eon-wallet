import {
    SELECT_EMOJI
} from '../actions/actionTypes';

const initialState = {
    selectedEmoji: ""
};

export const selectEmoji = (state = initialState, action) => {
  switch (action.type) {
      case SELECT_EMOJI:
        return {
            ...state,
            selectedEmoji: action.payload.emoji
        };
    default:
      return state;
  }
};

export default ({
    selectEmoji
});

//selectors
export const getSelectedEmoji = (state) => {
    return state.selectEmoji.selectedEmoji;
};