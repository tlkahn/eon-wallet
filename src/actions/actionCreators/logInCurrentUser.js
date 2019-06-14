import {
    LOG_IN_CURRENT_USER
} from '../actionTypes';

export const logInCurrentUser = () => (dispatch, getState) => {
    debugger
    dispatch({
        type: 'LOG_IN_CURRENT_USER',
        payload: {
            loggedIn: true
        }
    });
};