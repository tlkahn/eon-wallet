import {
    SEND_CRYPTO_TO_HUB,
} from '../actionTypes'
import {EON_HUB_ADDR} from '../../config/constants';

function getCook(cookiename) {
    let cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}


export const sendCryptoToHub = (cryptoPayment) => (dispatch, getState) => {
    debugger
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