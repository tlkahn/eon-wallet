import {
    CREATE_NEW_WALLET
} from '../actionTypes';

export const createNewWallet = (wallet) => (dispatch, getState) => {
    dispatch({
        type: CREATE_NEW_WALLET,
        payload: {
            wallet
        }
    });
};