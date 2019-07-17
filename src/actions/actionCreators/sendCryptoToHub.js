import {
    SEND_CRYPTO_TO_HUB,
} from '../actionTypes'
import {EON_HUB_ADDR} from '../../config/constants';
import {getCook} from '../../utils/cookie';

export const sendCryptoToHub = (cryptoPayment) => (dispatch, getState) => {
    const {amount, coinType, wallet, fee} = cryptoPayment;
    let password =getCook('password');
    let addr = EON_HUB_ADDR[coinType];
    wallet.send(
      amount, addr, fee, password
    ).then(() => {
        getState().createNewWallet.wallets.forEach(w => w.update());
    }, (e) => {
        console.log("error in send crypto to hub", e);
    });
    
    dispatch({
        type: 'SEND_CRYPTO_TO_HUB',
        payload: {
            ...cryptoPayment
        }
    });
};