import {
    SIGN_OUT_CURRENT_USER
} from '../actions/actionTypes';

const initialState = {
    signedOut: false,
    loggedIn: false
};

export const signOutCurrentUser = (state = initialState, action) => {
  switch (action.type) {
      case SIGN_OUT_CURRENT_USER:
        return {
            ...state,
            signedOut: true,
            loggedIn: false
        };
    default:
      return state;
  }
};

export default ({
    signOutCurrentUser
});

//selectors
export const getSignedOutStatus = (state) => {
    return {
        signedOut: state.signOutCurrentUser.signedOut,
        loggedIn: state.signOutCurrentUser.loggedIn
    };
};