import { combineReducers } from 'redux';

import {
    SEND_CRYPTO_STARTED,
    SEND_CRYPTO_SUCCESS
} from '../actionTypes'

export const sendCryptos = (crypto, account, recipient) => (dispatch, getState) => {
    dispatch({
        type: 'SEND_CRYPTO_STARTED',
        payload: {
            crypto,
            account,
            recipient
        }
    });
    //TODO: mock stub.
    setTimeout(()=>{
        dispatch({
            type: 'SEND_CRYPTO_SUCCESS',
            payload: {
                crypto,
                account,
                recipient
            }
        });
    }, 100);
}