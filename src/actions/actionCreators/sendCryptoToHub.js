import {
    SEND_CRYPTO_TO_HUB,
} from '../actionTypes'
import {ETH_CONFIG} from '../../config/constants';
import {getCook} from '../../utils/cookie';
import {ETHWallet} from '../../services/ETHWallet';

const EON_HUB_ADDR = ETH_CONFIG.EON_HUB_ADDR;

export const sendCryptoToHub = (cryptoPayment) => (dispatch, getState) => {
    const {amount, coinType, wallet, fee} = cryptoPayment;
    let password =getCook('password');
    let addr = EON_HUB_ADDR;
    console.log({sendCryptoToHubWallet: wallet});
    let w = new ETHWallet(wallet);
    w.send(
      amount, addr, fee, password,
    ).then((result) => {
        getState().createNewWallet.wallets.forEach(async w => {
            let wlt = new ETHWallet(w);
            let _ = await wlt.update();
            dispatch({
                type: 'SEND_CRYPTO_TO_HUB',
                payload: {
                    ...cryptoPayment,
                    status: 'success',
                    result
                }
            });
        });
    }, (e) => {
        console.log("error in send crypto to hub", e);
    });
    
    dispatch({
        type: 'SEND_CRYPTO_TO_HUB',
        payload: {
            ...cryptoPayment,
        }
    });
};