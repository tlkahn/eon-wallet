import {
    SEND_CRYPTO_TO_HUB,
} from '../actionTypes'

export const sendCryptoToHub = (cryptoPayment) => (dispatch, getState) => {
    dispatch({
        type: 'SEND_CRYPTO_TO_HUB',
        payload: {
            ...cryptoPayment
        }
    });
};