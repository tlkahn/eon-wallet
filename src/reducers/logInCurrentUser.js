import {
    LOG_IN_CURRENT_USER
} from '../actions/actionTypes';

const initialState = {
    loggedIn: false
};

export const logInCurrentUser = (state = initialState, action) => {
    debugger
  switch (action.type) {
      case LOG_IN_CURRENT_USER:
        return {
            ...state,
            loggedIn: action.payload.loggedIn
        };
    default:
      return state;
  }
};

export default ({
    logInCurrentUser
});

//selectors
export const getLoggedInStatus = (state) => {
    return {
        loggedIn: state.logInCurrentUser.loggedIn,
    };
};