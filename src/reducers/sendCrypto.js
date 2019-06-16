import {
    SEND_CRYPTO_STARTED, SEND_CRYPTO_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    sendCryptoStarted: false,
    sendCryptoSuccess: false
};

export const sendCryptos = (state = initialState, action) => {
    debugger
  switch (action.type) {
      case SEND_CRYPTO_STARTED:
        return {
            ...state,
            sendCryptoStarted: true,
            crypto: action.payload.crypto,
            account: action.payload.account,
            recipient: action.payload.recipient
        };
        case SEND_CRYPTO_SUCCESS:
        return {
            ...state,
            sendCryptoSuccess: true,
            sendCryptoStarted: false,
            crypto: action.payload.crypto,
            account: action.payload.account,
            recipient: action.payload.recipient
        };
    default:
      return state;
  }
};

export default ({
    sendCryptos
});

//selectors
export const getSendCryptoStatus = (state) => {
  const {crypto, account, recipient} = state.sendCryptos;
  if (state.sendCryptos.sendCryptoStarted) {
      return {
          status: 'started',
          crypto, account, recipient
      };
  }
  if (state.sendCryptos.sendCryptoSuccess) {
      return {
          status: 'success',
          crypto, account, recipient
      }
  }
};