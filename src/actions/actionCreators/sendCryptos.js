import { combineReducers } from 'redux';

import {
    SEND_CRYPTO_STARTED,
    SEND_CRYPTO_SUCCESS
} from '../actionTypes'

export const sendCryptos = (crypto, amount, account, recipient, messageText) => (dispatch, getState) => {
    dispatch({
        type: 'SEND_CRYPTO_STARTED',
        payload: {
            crypto,
            amount,
            account,
            recipient,
            messageText
        }
    });
    //TODO: mock stub.
    setTimeout(()=>{
        dispatch({
            type: 'SEND_CRYPTO_SUCCESS',
            payload: {
                crypto,
                amount,
                account,
                recipient,
                messageText
            }
        });
    }, 2000);
};