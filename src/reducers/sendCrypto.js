import {
    SEND_CRYPTO_STARTED, SEND_CRYPTO_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    sendCryptoStarted: false,
    sendCryptoSuccess: false
};

export const sendCryptos = (state = initialState, action) => {
  switch (action.type) {
      case SEND_CRYPTO_STARTED:
        return {
            ...state,
            sendCryptoStarted: true,
            crypto: action.payload.crypto,
            amount: action.payload.amount,
            account: action.payload.account,
            recipient: action.payload.recipient,
            messageText: action.payload.messageText
        };
        case SEND_CRYPTO_SUCCESS:
        return {
            ...state,
            sendCryptoSuccess: true,
            sendCryptoStarted: false,
            crypto: action.payload.crypto,
            amount: action.payload.amount,
            account: action.payload.account,
            recipient: action.payload.recipient,
            messageText: action.payload.messageText
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
  const {crypto, amount, account, recipient, messageText} = state.sendCryptos;
  if (state.sendCryptos.sendCryptoStarted) {
      return {
          status: 'started',
          crypto, amount, account, recipient, messageText
      };
  }
  if (state.sendCryptos.sendCryptoSuccess) {
      return {
          status: 'success',
          crypto, amount, account, recipient, messageText
      }
  }
};