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
            sendCryptoStarted: true
        };
        case SEND_CRYPTO_SUCCESS:
        return {
            ...state,
            sendCryptoSuccess: true,
            sendCryptoStarted: false
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
  if (state.sendCryptoStarted) {
      return 'started';
  }
  if (state.sendCryptoSuccess) {
      return 'success'
  }
}